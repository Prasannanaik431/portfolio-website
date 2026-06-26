"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Terminal, 
  Check, 
  Copy, 
  Send, 
  Server, 
  Globe, 
  Activity,
  Cpu,
  CornerDownLeft
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "Hiring / Project",
    message: "",
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [simSteps, setSimSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [trackingId] = useState(() => Math.random().toString(36).substring(2, 11));

  // Connection config metadata details
  const connectionDetails = [
    { label: "IP ADDRESS", value: "185.199.108.153", copy: "185.199.108.153" },
    { label: "PORT", value: "443 (HTTPS/TLS)", copy: "443" },
    { label: "EMAIL", value: "prasannanaik431@gmail.com", copy: "prasannanaik431@gmail.com", icon: Mail },
    { label: "LINKEDIN", value: "linkedin.com/in/prasanna-naik-40124b1ba", copy: "https://www.linkedin.com/in/prasanna-naik-40124b1ba/", icon: LinkedinIcon },
    { label: "GITHUB", value: "github.com/Prasannanaik431", copy: "https://github.com/Prasannanaik431", icon: GithubIcon },
    { label: "LEETCODE", value: "leetcode.com/u/prasannanaik431", copy: "https://leetcode.com/u/prasannanaik431/" },
  ];


  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormState]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormState> = {};
    if (!formData.name.trim()) errors.name = "identity parameter is required";
    if (!formData.email.trim()) {
      errors.email = "callback_address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "invalid email address format";
    }
    if (!formData.message.trim()) errors.message = "message_payload cannot be empty";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Steps in the terminal simulation (runs while the real API call is in-flight)
  const simulationScripts = React.useMemo(() => [
    "Initializing secure SSH session to prasanna.naik...",
    "Resolving host api.prasanna.naik (185.199.108.153) on port 443...",
    "Connecting... Established TLS 1.3 encrypted handshake.",
    "Loading payload parameters...",
    `Dispatched payload: { sender: "${formData.name}", callback: "${formData.email}", subject: "${formData.subject}" }`,
    "Routing through Resend email relay...",
    "Verifying delivery checksum...",
  ], [formData.name, formData.email, formData.subject]);

  // Drive the terminal animation; actual success/failure comes from the API response
  useEffect(() => {
    if (!isSubmitting) return;

    if (currentStepIndex < simulationScripts.length - 1) {
      const delay = currentStepIndex === -1 ? 300 : 600;
      const timer = setTimeout(() => {
        if (currentStepIndex === -1) {
          setSimSteps([simulationScripts[0]]);
          setCurrentStepIndex(0);
        } else {
          setSimSteps(prev => [...prev, simulationScripts[currentStepIndex + 1]]);
          setCurrentStepIndex(prev => prev + 1);
        }
      }, delay);
      return () => clearTimeout(timer);
    }
    // All animation steps shown — wait for the API promise to resolve (handled in handleSubmit)
  }, [isSubmitting, currentStepIndex, simulationScripts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Reset states and start animation + API call in parallel
    setSimSteps([]);
    setCurrentStepIndex(-1);
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      // Small buffer so the last animation step finishes before flipping to success
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 800);
    } catch (err) {
      // Show failure terminal screen — never expose raw error text
      console.error(err);
      setIsSubmitting(false);
      setSubmitError("transmission_failed");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Hiring / Project",
      message: "",
    });
    setSubmitSuccess(false);
    setSubmitError(null);
    setSimSteps([]);
    setCurrentStepIndex(-1);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black/10 border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wide mb-2">
            $ ./say-hello.sh
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Let&apos;s build something that stays calm at scale.
          </h3>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Scaling a platform, standardizing Kubernetes, or wiring GitOps from scratch — I&apos;d love to be part of that conversation.
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Pane: Config Panel & Connection Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 rounded-lg border border-black/5 dark:border-white/5 bg-white/[0.01] dark:bg-white/[0.01]">
            <div className="text-left">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-black/10 dark:border-white/5 pb-4">
                <Server className="h-5 w-5 text-brand-cyan" />
                <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
                  connection_properties.yaml
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-6 leading-relaxed font-sans">
                Below are the active direct connection routes. Click on any route path to copy the credentials directly to your local clipboard buffer.
              </p>

              {/* YAML-styled config list */}
              <div className="space-y-4 font-mono text-xs">
                {connectionDetails.map((detail) => (
                  <div
                    key={detail.label}
                    onClick={() => handleCopy(detail.copy, detail.label)}
                    className="p-3 rounded border border-black/5 dark:border-white/[0.03] bg-black/5 dark:bg-black/20 hover:border-brand-cyan/20 cursor-pointer group transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {detail.icon && <detail.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-brand-cyan transition-colors flex-shrink-0" />}
                      <span className="text-muted-foreground font-semibold">{detail.label}:</span>
                      <span className="text-foreground group-hover:text-brand-cyan transition-colors truncate max-w-[220px] sm:max-w-none">
                        {detail.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-cyan/40 group-hover:text-brand-cyan flex items-center gap-1 select-none">
                      {copiedField === detail.label ? (
                        <>
                          <Check className="h-3 w-3 text-green-500" />
                          <span className="text-green-500 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Link/Status indicators */}
            <div className="mt-8 border-t border-black/10 dark:border-white/5 pt-4 flex flex-wrap justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground select-none">
              <div className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-green-500 animate-pulse" />
                <span>ROUTE STATUS: ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-brand-blue" />
                <span>SSL: VALID</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-brand-cyan" />
                <span>SYS LOAD: NORMAL</span>
              </div>
            </div>
          </div>

          {/* Right Pane: SSH Console Form */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-black/15 dark:border-white/5 shadow-2xl flex flex-col bg-black/40 backdrop-blur-md min-h-[480px]">
            {/* Terminal Window Header */}
            <div className="bg-black/60 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                guest@ops-console: ~
              </div>
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Terminal Content Screen */}
            <div className="p-6 flex-1 flex flex-col justify-between font-mono text-xs">
              
              <AnimatePresence mode="wait">
                {/* STATE 1: Standard Input Form */}
                {!isSubmitting && !submitSuccess && !submitError && (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-left flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Identity Input */}
                      <div>
                        <label className="block text-brand-cyan mb-1.5">
                          client_identity:
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder='"John Doe"'
                          suppressHydrationWarning
                          className={`w-full bg-black/30 border ${
                            formErrors.name ? "border-red-500/50" : "border-white/5"
                          } focus:border-brand-cyan/40 rounded px-3 py-2 text-foreground focus:outline-none placeholder:text-white/10`}
                        />
                        {formErrors.name && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            [!] Error: {formErrors.name}
                          </span>
                        )}
                      </div>

                      {/* Callback Address Input */}
                      <div>
                        <label className="block text-brand-cyan mb-1.5">
                          callback_address:
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder='"john.doe@example.com"'
                          suppressHydrationWarning
                          className={`w-full bg-black/30 border ${
                            formErrors.email ? "border-red-500/50" : "border-white/5"
                          } focus:border-brand-cyan/40 rounded px-3 py-2 text-foreground focus:outline-none placeholder:text-white/10`}
                        />
                        {formErrors.email && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            [!] Error: {formErrors.email}
                          </span>
                        )}
                      </div>

                      {/* Subject Selection */}
                      <div>
                        <label className="block text-brand-cyan mb-1.5">
                          routing_subject:
                        </label>
                        <div className="relative">
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            suppressHydrationWarning
                            className="w-full bg-black/40 border border-white/5 focus:border-brand-cyan/40 rounded px-3 py-2 text-foreground focus:outline-none appearance-none cursor-pointer"
                          >
                            <option value="Hiring / Project">&quot;Hiring / Project&quot;</option>
                            <option value="General Q&A">&quot;General Q&A&quot;</option>
                            <option value="System Check / Hello">&quot;System Check / Hello&quot;</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-cyan">
                            <CornerDownLeft className="h-3 w-3" />
                          </div>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div>
                        <label className="block text-brand-cyan mb-1.5">
                          message_payload:
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder='"Type your secure payload message here..."'
                          rows={4}
                          suppressHydrationWarning
                          className={`w-full bg-black/30 border ${
                            formErrors.message ? "border-red-500/50" : "border-white/5"
                          } focus:border-brand-cyan/40 rounded px-3 py-2 text-foreground focus:outline-none placeholder:text-white/10 resize-none`}
                        />
                        {formErrors.message && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            [!] Error: {formErrors.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Submit Button Action */}
                    <div className="pt-4 select-none">
                      <button
                        type="submit"
                        suppressHydrationWarning
                        className="group flex items-center justify-center gap-2 rounded bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-2.5 text-xs font-semibold text-white shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>$ execute connection_request</span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* STATE 2: Simulated SSH Transmission Console */}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between text-left h-full min-h-[380px]"
                  >
                    <div className="space-y-2.5 font-mono text-white/80">
                      <div className="text-brand-cyan mb-4 font-bold select-none">
                        $ ssh-session -v mail@prasanna.naik --payload=stdin
                      </div>

                      {simSteps.map((step, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-brand-cyan select-none">&gt;</span>
                          <span className={idx === simSteps.length - 1 ? "text-brand-blue font-bold" : ""}>
                            {step}
                          </span>
                        </motion.div>
                      ))}

                      {currentStepIndex < simulationScripts.length && (
                        <div className="flex items-center gap-1 mt-2 text-brand-cyan select-none">
                          <span className="animate-pulse">●</span>
                          <span className="animate-pulse">●</span>
                          <span className="animate-pulse">●</span>
                        </div>
                      )}                    </div>

                    <div className="text-[10px] text-muted-foreground border-t border-white/5 pt-4 flex justify-between select-none">
                      <span>SECURE TRANSIT PORT: 443</span>
                      <span>ENCRYPTION: AES-256-GCM</span>
                    </div>
                  </motion.div>
                )}

                {/* STATE 3: Success Console Report */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between text-left h-full min-h-[380px]"
                  >
                    <div className="space-y-4">
                      {/* Command output */}
                      <div className="text-muted-foreground select-none">
                        $ curl -i -X POST https://api.prasanna.naik/v1/contact
                      </div>

                      <div className="font-mono text-white/90 space-y-1">
                        <div><span className="text-brand-cyan font-bold">HTTP/2 200 OK</span></div>
                        <div><span className="text-muted-foreground">content-type:</span> application/json</div>
                        <div><span className="text-muted-foreground">date:</span> {new Date().toUTCString()}</div>
                        <div><span className="text-muted-foreground">server:</span> Cloudflare/AWS-ALB-Ingress</div>
                      </div>

                      {/* JSON Response Block */}
                      <div className="bg-black/30 border border-white/5 rounded p-4 text-[11px] font-mono leading-relaxed text-brand-cyan overflow-x-auto no-scrollbar">
{`{
  "status": "success",
  "data": {
    "sender": "${formData.name}",
    "relay_service": "resend-email-relay",
    "delivery_status": "delivered",
    "message": "Email forwarded to Prasanna Suresh Naik."
  },
  "pipeline_logs": [
    "api_request_received",
    "resend_relay_accepted",
    "email_delivered_ok"
  ],
  "tracking_id": "msg-${trackingId}"
}`}
                      </div>

                      <div className="flex items-center gap-2 text-green-500 font-bold text-xs select-none">
                        <Check className="h-4 w-4 bg-green-500/10 rounded-full p-0.5 border border-green-500/20" />
                        <span>Event processed successfully. Route connection closed.</span>
                      </div>
                    </div>

                    <div className="pt-6 select-none">
                      <button
                        onClick={handleReset}
                        className="group flex items-center gap-2 rounded border border-white/10 hover:border-brand-cyan/20 hover:text-brand-cyan bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold font-mono tracking-wider transition-all"
                      >
                        <Terminal className="h-3.5 w-3.5 text-brand-cyan" />
                        <span>$ clear &amp;&amp; reset_shell</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STATE 4: Failure Console Report */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between text-left h-full min-h-[380px]"
                  >
                    <div className="space-y-4">
                      <div className="text-muted-foreground select-none">
                        $ curl -i -X POST https://api.prasanna.naik/v1/contact
                      </div>

                      <div className="font-mono text-white/90 space-y-1">
                        <div><span className="text-red-400 font-bold">HTTP/2 503 Service Unavailable</span></div>
                        <div><span className="text-muted-foreground">content-type:</span> application/json</div>
                        <div><span className="text-muted-foreground">date:</span> {new Date().toUTCString()}</div>
                      </div>

                      <div className="bg-black/30 border border-red-500/20 rounded p-4 text-[11px] font-mono leading-relaxed text-red-400 overflow-x-auto no-scrollbar">
{`{
  "status": "error",
  "code": 503,
  "message": "Relay unavailable. Please try again or reach out directly.",
  "fallback": "prasannanaik431@gmail.com"
}`}
                      </div>

                      <div className="flex items-start gap-2 text-red-400 font-bold text-xs select-none">
                        <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-[9px]">!</span>
                        <span>Transmission failed. Email directly at <a href="mailto:prasannanaik431@gmail.com" className="underline hover:text-red-300 transition-colors">prasannanaik431@gmail.com</a></span>
                      </div>
                    </div>

                    <div className="pt-6 select-none">
                      <button
                        onClick={handleReset}
                        className="group flex items-center gap-2 rounded border border-white/10 hover:border-red-500/20 hover:text-red-400 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold font-mono tracking-wider transition-all"
                      >
                        <Terminal className="h-3.5 w-3.5 text-red-400" />
                        <span>$ retry connection</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
