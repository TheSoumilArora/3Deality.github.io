import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kiri?: {
      api?: {
        frame?: {
          setMode: (mode: string) => void;
          clear: () => void;
          load: (path: string) => void;
          on: (event: string, callback: () => void) => void;
          slice: () => void;
          prepare: () => void;
          export: () => void;
        };
      };
    };
  }
}

const SlicerWindow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.kiri?.api?.frame) {
      console.error("Kiri:Moto API not found. Ensure the script is loaded.");
      return;
    }

    const api = window.kiri.api.frame;
    api.setMode("FDM"); // FDM (Fused Deposition Modeling)
    api.clear();
    // api.load("/obj/cube.stl");

    api.on("loaded", () => {
      console.log("Model loaded, starting slicing...");
      api.slice();
    });

    api.on("slice.done", () => {
      console.log("Slicing done, preparing...");
      api.prepare();
    });

    api.on("prepare.done", () => {
      console.log("Preparation done, exporting...");
      api.export();
    });
  }, []);

  return (
    <div ref={containerRef} id="kiri-container" style={{ width: "100%", height: "500px" }}>
      {/* If Kiri:Moto needs a canvas or container, it will use this */}
    </div>
  );
};

export default SlicerWindow;