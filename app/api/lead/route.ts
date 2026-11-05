import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { name, phone, contactTime, type, propertyInterest } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Name and Phone are required" }, { status: 400 });
    }

    // Forward lead in real-time to Python API Server (http://localhost:8000/api/leads)
    try {
      const pyRes = await fetch("http://localhost:8000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, contactTime, type, propertyInterest }),
      });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        return NextResponse.json({
          success: true,
          message: "Enquiry delivered to Vizhi advisors in real-time!",
          lead: pyData.lead,
          whatsappUrl: pyData.whatsappUrl,
        });
      }
    } catch {
      // If Python server is offline, proceed to fallback
    }

    // Fallback WhatsApp URL for the Vizhi team
    const textMsg = `Hi Vizhi Infragen Team! New Real-Time Enquiry:\nName: ${name}\nPhone: ${phone}\nContact Time: ${contactTime || "Anytime"}`;
    const whatsappUrl = `https://wa.me/919688889420?text=${encodeURIComponent(textMsg)}`;

    return NextResponse.json({
      success: true,
      message: "Enquiry recorded successfully!",
      lead: { name, phone, contactTime },
      whatsappUrl,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
