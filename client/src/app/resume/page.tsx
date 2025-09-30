"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

const url = "/data/Emdadul_Hoque_Emon_Full_Stack_Resume.pdf";

export default function ResumePage() {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  return (
    <div className="min-h-screen mt-16 bg-background">
      {/* PDF Viewer */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Resume Preview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center">
              <div
                className="border border-border rounded-lg overflow-hidden shadow-lg bg-white"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                }}
              >
                <iframe
                  src={`${url}?scale=${scale}&rotation=${rotation}`}
                  width="800"
                  height="1000"
                  className="border-0"
                  title="Emdadul Hoque Emon Resume"
                />
              </div>
            </div>

            {/* Mobile fallback */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                PDF preview may not work properly on mobile devices.
              </p>
              <Button asChild>
                <a
                  href={url}
                  download="Emdadul_Hoque_Emon_Full_Stack_Resume.pdf"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume PDF
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
