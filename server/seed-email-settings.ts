import { db } from "./db";
import { formEmailSettings } from "@shared/schema";
import { eq } from "drizzle-orm";

const initialRecipients: Record<string, Array<{ recipientEmail: string; recipientName: string; ccType: string }>> = {
  contact: [
    { recipientEmail: "info@efsgnj.com", recipientName: "EFSG Info", ccType: "to" },
    { recipientEmail: "ymatos@efsgnj.com", recipientName: "Y. Matos", ccType: "cc" },
    { recipientEmail: "nicholson@kvibe.com", recipientName: "Nicholson", ccType: "cc" },
    { recipientEmail: "zcruz@efsgnj.com", recipientName: "Z. Cruz", ccType: "cc" },
  ],
  vendor: [
    { recipientEmail: "info@efsgnj.com", recipientName: "EFSG Info", ccType: "to" },
    { recipientEmail: "ymatos@efsgnj.com", recipientName: "Y. Matos", ccType: "cc" },
    { recipientEmail: "nicholson@kvibe.com", recipientName: "Nicholson", ccType: "cc" },
    { recipientEmail: "zcruz@efsgnj.com", recipientName: "Z. Cruz", ccType: "cc" },
  ],
};

export async function seedFormEmailSettings() {
  for (const [formType, recipients] of Object.entries(initialRecipients)) {
    const existing = await db.select().from(formEmailSettings).where(eq(formEmailSettings.formType, formType));
    if (existing.length > 0) {
      console.log(`Email settings for "${formType}" already exist (${existing.length}), skipping`);
      continue;
    }

    for (const recipient of recipients) {
      await db.insert(formEmailSettings).values({
        formType,
        recipientEmail: recipient.recipientEmail,
        recipientName: recipient.recipientName,
        ccType: recipient.ccType,
        isActive: true,
      });
      console.log(`Added email recipient: ${recipient.recipientEmail} (${recipient.ccType}) for ${formType}`);
    }
  }
}
