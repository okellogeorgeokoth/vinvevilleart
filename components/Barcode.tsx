"use client";
import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
}

const Barcode: React.FC<BarcodeProps> = ({ value }) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        width: 0.5, // Thin bars
        height: 30, // Short height
        displayValue: true, // Show the value below the barcode
        fontOptions: "bold", // Make the text bold
        font: "Arial", // Use a readable font
        textMargin: 2, // Small margin between barcode and text
        fontSize: 10, // Small font size for the text
      });
    }
  }, [value]);

  return <svg ref={barcodeRef} style={{ width: "100%", height: "auto" }} />;
};

export default Barcode;