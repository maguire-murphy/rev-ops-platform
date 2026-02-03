import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Beacon Platform";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: "#0A1628",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "24px",
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "2px solid rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "64px",
                            fontWeight: "bold",
                            color: "#FFD93D",
                        }}
                    >
                        B
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "72px" }}>Beacon</div>
                </div>
                <div
                    style={{
                        fontSize: "32px",
                        opacity: 0.9,
                        fontWeight: "400",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Revenue Operations Platform
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
