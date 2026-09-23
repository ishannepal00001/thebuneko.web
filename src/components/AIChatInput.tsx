import { useEffect, useRef, useState } from 'react';
import type { FormEvent, RefObject } from 'react';
import { motion } from 'motion/react';
import { Send, X } from 'lucide-react';
import AIDisc from './AIDisc';

export type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

type AIChatInputProps = {
  /** Ref of the hero section — the bar stays expanded while it is in view. */
  heroRef?: RefObject<HTMLElement | null>;
  /** Override the built-in mock responder with a real backend call. */
  onSendMessage?: (text: string, history: ChatMessage[]) => Promise<string>;
};

/** Placeholder responder until a real AI endpoint is wired up. */
async function mockReply(text: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 700));
  const t = text.toLowerCase();
  if (/(hello|hi|hey|namaste)/.test(t))
    return 'Hello! Welcome to Buneko. Are you looking for everyday wear, gifts, or yarn and accessories?';
  if (/(price|cost|much)/.test(t))
    return 'Most finished pieces range from ₹499 to ₹2,999 depending on size and yarn. Tell me what you have in mind and I can narrow it down.';
  if (/(ship|deliver|delivery)/.test(t))
    return 'We ship across India in 3–5 working days. Every order is packed plastic-free with a handwritten note.';
  if (/(hour|open|store|visit)/.test(t))
    return 'Our studio is open Monday to Saturday, 10am to 7pm. You can also browse everything under Products.';
  if (/(product|crochet|buy|gift|yarn|order)/.test(t))
    return 'You can explore the full range on the Products page — cozy wear, accessories, and one-of-a-kind gifts, all stitched by hand.';
  return 'Thanks for asking! A maker will confirm the details shortly. Meanwhile, feel free to browse Products or ask about yarn, sizing, or gifting.';
}

function PromptBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  autoFocus,
  framed = true,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  placeholder: string;
  autoFocus?: boolean;
  framed?: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={
        framed
          ? 'flex items-center gap-2 rounded-full border border-border bg-background py-2 pl-5 pr-2 shadow-[0_16px_40px_-20px_rgba(74,45,27,0.5)]'
          : 'flex h-full w-full items-center gap-2 py-2 pl-5 pr-2'
      }
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Ask Buneko assistant"
        className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
      />
      {/* Send sits at the trailing edge of the bar — not centered */}
      <button
        type="submit"
        aria-label="Send message"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-accent"
      >
        <Send aria-hidden="true" className="h-4 w-4" />
      </button>
    </form>
  );
}

function useViewportWidth() {
  const [vw, setVw] = useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vw;
}

/**
 * Floating AI prompt bar. It rests centered at the bottom while the hero is
 * visible; scrolling past the hero collapses it — with a spring morph — into
 * the rotating disc pinned bottom-right. Opening the disc centers a 60%-wide
 * chat prompt.
 */
export default function AIChatInput({ heroRef, onSendMessage }: AIChatInputProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const vw = useViewportWidth();
  const [heroVisible, setHeroVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'assistant',
      text: "Hi, I'm the Buneko assistant! Ask me about crochet pieces, yarn, sizing, or gifting.",
    },
  ]);

  // Fold into the disc once the hero scrolls out of view
  useEffect(() => {
    const el = heroRef?.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [heroRef]);

  // Keep the latest message in view + lock body scroll while open
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open ]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    const userMsg: ChatMessage = { id: idRef.current++, role: 'user', text };
    const history = [...messages, userMsg];
    setMessages(history);
    setTyping(true);
    try {
      const reply = onSendMessage ? await onSendMessage(text, history) : await mockReply(text);
      setMessages((m) => [...m, { id: idRef.current++, role: 'assistant', text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: 'assistant', text: 'Something went wrong — please try again.' },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const submitFloating = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setOpen(true);
    void send(input);
    setInput('');
  };

  const submitModal = (e: FormEvent) => {
    e.preventDefault();
    if (!modalInput.trim()) return;
    void send(modalInput);
    setModalInput('');
  };

  // Morph geometry: one element gliding between bottom-center bar and
  // bottom-right AI disc (same rotating-wordmark language as ContactDisc)
  const folded = !heroVisible;
  const DISC = vw < 768 ? 104 : 144;
  const barWidth = Math.min(576, vw - 32);
  const expandedX = (vw - barWidth) / 2 - 16;
  const foldedX = vw - DISC - 24 - 16;

  return (
    <>
      {/* Morphing element — bottom-center bar that collapses into the AI disc */}
      <motion.div
        className="fixed bottom-6 left-4 z-40"
        initial={false}
        animate={{
          x: folded ? foldedX : expandedX,
          width: folded ? DISC : barWidth,
          height: folded ? DISC : 56,
          opacity: open ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
        style={{ pointerEvents: open ? 'none' : 'auto' }}
      >
        <div className="relative h-full w-full">
          {/* Expanded state — the prompt bar shell */}
          <div
            className={`absolute inset-0 flex items-center overflow-hidden rounded-full border border-border bg-background shadow-[0_16px_40px_-12px_rgba(74,45,27,0.6)] transition-opacity duration-200 ${
              folded ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <PromptBar
              framed={false}
              value={input}
              onChange={setInput}
              onSubmit={submitFloating}
              placeholder="Ask about crochet, yarn, gifts…"
            />
          </div>
          {/* Folded state — the rotating AI disc */}
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              folded ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <AIDisc onClick={() => setOpen(true)} />
          </div>
        </div>
      </motion.div>

      {/* Centered chat prompt — 60% of the space */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buneko assistant chat"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-text-primary/40 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[80svh] w-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-[0_32px_80px_-24px_rgba(74,45,27,0.55)] md:w-[60%]">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-primary">
                Buneko Assistant
              </p>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="p-1 text-text-secondary transition-colors hover:text-text"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-48 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
              {messages.map((m) => (
                <p
                  key={m.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'self-end rounded-br-sm bg-primary text-on-primary'
                      : 'self-start rounded-bl-sm bg-surface text-text-primary'
                  }`}
                >
                  {m.text}
                </p>
              ))}
              {typing && (
                <p className="self-start rounded-2xl rounded-bl-sm bg-surface px-4 py-2.5 text-sm text-text-secondary">
                  Typing…
                </p>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border px-4 py-3">
              <PromptBar
                value={modalInput}
                onChange={setModalInput}
                onSubmit={submitModal}
                placeholder="Type your message…"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
