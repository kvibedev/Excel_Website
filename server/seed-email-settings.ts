import { db } from "./db";
import { formEmailSettings } from "@shared/schema";

const initialRecipients = [
  { formType: "contact", recipientEmail: "info@efsgnj.com", recipientName: "EFSG Info", ccType: "to" },
  { formType: "contact", recipientEmail: "ymatos@efsgnj.com", recipientName: "Y. Matos", ccType: "cc" },
  { formType: "contact", recipientEmail: "nicholson@kvibe.com", recipientName: "Nicholson", ccType: "cc" },
  { formType: "contact", recipientEmail: "zcruz@efsgnj.com", recipientName: "Z. Cruz", ccType: "cc" },
];

export async function seedFormEmailSettings() {
  const existing = await db.select().from(formEmailSettings);
  if (existing.length > 0) {
    console.log("Form email settings already seeded, skipping");
    return;
  }

  for (const recipient of initialRecipients) {
    await db.insert(formEmailSettings).values({
      formType: recipient.formType,
      recipientEmail: recipient.recipientEmail,
      recipientName: recipient.recipientName,
      ccType: recipient.ccType,
      isActive: true,
    });
    console.log(`Added email recipient: ${recipient.recipientEmail} (${recipient.ccType}) for ${recipient.formType}`);
  }
}
