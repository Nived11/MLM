import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { CloudUpload } from "lucide-react";
import { FaCopy } from "react-icons/fa";
import { Skeleton } from "../../../components/ui/skeleton";

import { useInitiatePayment } from "../hooks/useInitiatePayment";
import { useManualPayment } from "../hooks/useManualPayment";


type LocationState = { levelId?: number | string };

const SendHelpPayment = (props: { levelId?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ levelId?: string }>();
  
  const resolvedLevelId =
    props.levelId || (location.state as LocationState)?.levelId || params.levelId;
    console.log("Resolved Level ID:", resolvedLevelId);


  const [copied, setCopied] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [amount, setAmount] = useState<string>("0");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { data: paymentData, loading: initLoading, error: initError } =
    useInitiatePayment(resolvedLevelId, true);

  const { uploadPayment, loading: payLoading, error: payError } = useManualPayment();

  const [formData, setFormData] = useState({
    user_level_id: "",
    username: "",
    user_email: "",
    upi_number: "",
    user_id:"",
    payment_method: "Manual"
  });

  useEffect(() => {
    if (paymentData) {
        console.log(" Payment Data Updated:", paymentData, "Loading:", initLoading, "Error:", initError);
      setFormData({
        user_level_id: String(paymentData.user_level_id || ""),
        username: paymentData.referrer_details?.full_name || "",
        user_email: "",
        upi_number: paymentData.referrer_details?.upi_number || "",
        user_id:paymentData.referrer_details?.user_id || "",
        payment_method: "Manual",
      });
      setAmount(paymentData.payment_amount?.toString() || "0");
       console.log("Form Data Set:", formData);
    }
  }, [paymentData, initLoading, initError]);

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
      console.log(" Files dropped:", e.dataTransfer.files);
    }
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!resolvedLevelId) {
      setMessage({ type: "error", text: "Missing level info." });
      return;
    }

    const formPayload = new FormData();
    formPayload.append("level_id", String(resolvedLevelId));
    formPayload.append("user_level_id", formData.user_level_id || "");
    formPayload.append("user_id",formData.user_id || "");
    formPayload.append("username", formData.username || "");
    formPayload.append("user_email", formData.user_email || "");
    formPayload.append("upi_number", formData.upi_number || "");
    formPayload.append("payment_amount", amount);
    formPayload.append("payment_method", formData.payment_method);

    files.forEach((file) => formPayload.append("payment_proof", file));

    for (const [key, value] of formPayload.entries()) {
      console.log(`form entries ${key}:`, value);
    }

    try {
      const res = await uploadPayment(formPayload);
      console.log("Payment Submitted Response:", res);
      setMessage({ type: "success", text: res.message });
      setTimeout(() => navigate(-1), 1500); 
    } catch (err: any) {
      console.error(" Payment Submission Error:", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Upload failed";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  return (
    <div className="bg-background text-foreground flex items-center justify-center px-3 py-8">
      <div className="w-full max-w-[900px] flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Payment Step</h2>
        <div className="rounded-xl p-[1px] bg-gradient-to-b from-purple-700 to-purple-900">
          <div className="rounded-xl bg-background p-4 sm:p-6 flex flex-col gap-4">
            <div className="rounded-lg p-[1px] bg-gradient-to-b from-purple-700 to-purple-900">
              <div className="flex items-center justify-between w-full h-[42px] rounded-lg bg-black px-3">
                {initLoading ? (
                  <Skeleton className="w-32 h-5" />
                ) : (
                  <span className="text-sm sm:text-base font-medium text-white">
                    UPI: {formData.upi_number}
                  </span>
                )}
                <button
                  onClick={() => handleCopy(formData.upi_number)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md border border-white/30 text-white bg-transparent text-xs sm:text-sm"
                >
                  {copied ? "Copied!" : <FaCopy size={14} />}
                </button>
              </div>
            </div>
            <div>
              <div className="rounded-lg p-[1px] bg-gradient-to-b from-purple-700 to-purple-900">
                {initLoading ? (
                  <Skeleton className="w-full h-[42px] rounded-lg" />
                ) : (
                  <Input
                    value={formData.user_id}
                    readOnly
                    className="w-full h-[42px] rounded-lg bg-black text-white text-sm sm:text-base font-medium border-0"
                  />
                )}
              </div>
              {!initLoading && (
                <p className="text-[10px] sm:text-xs text-orange-500 mt-1">
                  Full Name : {formData.username}
                </p>
              )}
              {initError && <p className="text-xs text-red-400">Error: {initError}</p>}
            </div>
            <div className="rounded-lg p-[1px] bg-gradient-to-b from-purple-700 to-purple-900">
              <Input
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-[42px] rounded-lg bg-black text-white text-sm sm:text-base font-medium border-0"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-medium text-white">
                Payment with/without Proof
              </span>
              <Switch checked={showUpload} onCheckedChange={(v) => setShowUpload(!!v)} />
            </div>
            {showUpload && (
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="rounded-lg p-4 border-2 border-dashed border-purple-500 bg-black/20 flex flex-col items-center justify-center w-full max-w-[500px] cursor-pointer text-white text-sm sm:text-base"
              >
                <input
                  id="paymentProof"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setFiles((prev) => [
                      ...prev,
                      ...(e.target.files ? Array.from(e.target.files) : []),
                    ])
                  }
                />
                <label
                  htmlFor="paymentProof"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <CloudUpload size={28} className="mb-2" />
                  {files.length > 0 ? (
                    <ul className="text-xs sm:text-sm space-y-1">
                      {files.map((f, i) => (
                        <li key={i}>{f.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>Click or drag files here to upload</span>
                  )}
                </label>
              </div>
            )}
            {message && (
              <div
                className={`p-2 rounded-md text-sm ${
                  message.type === "success"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {message.text}
              </div>
            )}
            <div className="flex justify-end">
              <div className="rounded-lg p-[1px] bg-gradient-to-b from-purple-700 to-purple-900">
                <Button
                  onClick={handleSubmit}
                  disabled={payLoading || initLoading}
                  className="w-[100px] h-[38px] rounded-lg bg-transparent text-white text-sm sm:text-base font-medium border-0"
                >
                  {payLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
            {payError && <p className="text-xs text-red-400">Payment error: {payError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendHelpPayment;