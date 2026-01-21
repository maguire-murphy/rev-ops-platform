import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RevOps Analytics Platform";
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
                    background: "linear-gradient(135deg, #1e3a5f 0%, #3730a3 100%)",
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
                            background: "rgba(255, 255, 255, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "48px",
                            fontWeight: "bold",
                        }}
                    >
                        RA
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "72px" }}>RevOps Analytics</div>
                </div>
                <div
                    style={{
                        fontSize: "32px",
                        opacity: 0.9,
                        fontWeight: "400",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Revenue Operations Analytics Platform
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
