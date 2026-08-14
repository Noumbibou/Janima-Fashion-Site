"use client";

import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { WHATSAPP_GROUP_LINK, buildProductMessage } from "../../lib/whatsapp";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!product) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (copied) {
      timeoutId = window.setTimeout(() => setCopied(false), 2000);
    }
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [copied]);

  if (!product) {
    return null;
  }

  const message = buildProductMessage(product);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        return;
      }

      const textArea = document.createElement("textarea");
      textArea.value = message;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        onClick={handleContentClick}
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Fermer"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-media">
          <img src={product.imageUrl} alt={product.imageAlt} />
        </div>

        <div className="modal-body">
          <div>
            {product.category ? (
              <p className="modal-category">{product.category}</p>
            ) : null}
            {product.name ? <h2 className="modal-name">{product.name}</h2> : null}
            {product.description ? (
              <p className="modal-description">{product.description}</p>
            ) : null}
          </div>

          <div className="modal-actions">
            {WHATSAPP_GROUP_LINK ? (
              <a
                className="modal-button modal-button-primary"
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rejoindre le groupe
              </a>
            ) : (
              <span className="modal-button modal-button-disabled">
                Lien à venir
              </span>
            )}
            <button
              className="modal-button modal-button-secondary"
              type="button"
              onClick={handleCopy}
            >
              {copied ? "Copié !" : "Copier le message"}
            </button>
          </div>

          <div className="modal-message">
            <p className="modal-message-label">Message prêt à copier</p>
            <p className="modal-message-text">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
