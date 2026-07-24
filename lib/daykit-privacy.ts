/* ──────────────────────────────────────────────────────────
   DayKit privacy policy content.

   Single source of truth for the copy rendered at
   /products/daykit/privacy-policy. This is the hosted, public
   version of the policy that ships inside the DayKit Android app
   (see PrivacyPolicyScreen.kt). Keep the two in sync — Google
   Play fetches this page for the store listing.
   ────────────────────────────────────────────────────────── */

export type PolicySection = {
  title: string;
  body: string[];
};

export type PrivacyPolicyContent = {
  product: string; // e.g. "DayKit"
  effectiveDate: string;
  intro: string;
  sections: PolicySection[];
};

export const DAYKIT_PRIVACY: PrivacyPolicyContent = {
  product: "DayKit",
  effectiveDate: "May 9, 2026",
  intro: "This policy is written for the DayKit Android app.",
  sections: [
    {
      title: "Overview",
      body: [
        "DayKit is a local-first privacy utility. The app is designed to keep user-created data on the device unless the user intentionally creates an encrypted local backup or connects Google Drive backup.",
        "This policy explains what data the app accesses, how the data is used, what is stored locally, what may be placed into encrypted backup files, and how optional permissions are used.",
      ],
    },
    {
      title: "Data Stored On The Device",
      body: [
        "Master PIN credential: the app stores a salted password hash for verifying the master PIN. The original PIN is not stored.",
        "Key Store: saved key names, labels, and values are stored in the encrypted local database.",
        "Secure Notes: note titles, content, labels, and timestamps are stored in the encrypted local database.",
        "Expenses and Habits: tracker entries, bills, habit definitions, progress logs, and related timestamps are stored locally.",
        "App Lock: selected locked package names and app labels are stored locally so App Lock can continue working after app restart or device reboot.",
        "Settings: tool-lock preferences, backup preferences, selected Google account email for Drive backup, theme preferences, widget preferences, and local app configuration may be stored on the device.",
        "File Vault: selected media files are encrypted with AES-256 and stored in the app's private storage on the device, where other apps and file managers cannot read them. Each file has its own key, protected by the device keystore.",
      ],
    },
    {
      title: "Backup And Google Drive",
      body: [
        "Backups are encrypted on the device before they are saved or uploaded. The backup password is used to derive the backup encryption key, and backup content is encrypted before it leaves the device.",
        "Key Store and Secure Notes are always included in encrypted backup files. Expenses, Habits, and File Vault files are optional and can be enabled or disabled in Backup & Restore settings. File Vault backup is off by default; vault files are only included when the user explicitly turns it on.",
        "Restoring a backup requires the master PIN, because it replaces the data currently on the device.",
        "App Lock package selections, theme preferences, widget settings, DNS choices, reminder schedules, and editor cache are not included in app backup files.",
        "When Google Drive backup is enabled, DayKit requests access to create and manage its own backup files in the user's Google Drive. The app uploads encrypted backup files; it does not upload plain Key Store values, notes, expenses, or habits.",
        "Google account authorization is used only for the backup and restore actions chosen by the user or for automatic backup when the user enables it.",
      ],
    },
    {
      title: "Usage Access, Overlay, Notifications, And Device Admin",
      body: [
        "Usage Access is used to identify the foreground app for App Lock behavior.",
        "Overlay permission may be used to display a lock challenge over selected locked apps.",
        "App Lock is a deterrent, not a guarantee. Because Android limits what one app can do to another, a determined person with physical access may bypass App Lock (for example via the recent-apps screen, safe mode, by revoking DayKit's permissions, or during the brief moment an app opens). App Lock does not encrypt the locked apps' own data. For strongest protection, also use your device's screen lock and, where available, per-app protections such as Secure Folder.",
        "Notification permission is used for reminders, habits, and app alerts when the user enables those features.",
        "Device Admin is optional and is used only for uninstall protection. It does not give DayKit access to personal files or messages.",
      ],
    },
    {
      title: "Network And Third Parties",
      body: [
        "DayKit uses internet access for Google Drive backup and restore when the user connects a Google account.",
        "The app uses Google sign-in/authorization components and Google Drive APIs for Drive backup operations.",
        "The app does not sell user data. The app does not use advertising identifiers for ad targeting. The app does not intentionally share user-created vault data with third parties except when the user stores an encrypted backup in Google Drive.",
      ],
    },
    {
      title: "Security Measures",
      body: [
        "The local database is encrypted with SQLCipher. The database passphrase is randomly generated and protected using Android Keystore.",
        "Sensitive Key Store and Secure Notes fields are encrypted before storage.",
        "Backup files are encrypted with a password chosen by the user. If the backup password is forgotten, the backup cannot be restored.",
        "The app sets secure window flags on the main activity to reduce screenshots of sensitive screens where supported by Android.",
      ],
    },
    {
      title: "Retention And Deletion",
      body: [
        "Data remains on the device until the user deletes it inside the app, clears app data, or uninstalls the app.",
        "Encrypted Google Drive backup files remain in the user's Google Drive until deleted by the user or by backup retention behavior. DayKit keeps only recent backup files when it creates new Drive backups.",
        "Uninstalling the app or clearing app data removes local app data from the device. It does not automatically delete backup files already stored in Google Drive.",
      ],
    },
    {
      title: "User Choices",
      body: [
        "Users can choose whether to enable Usage Access, Overlay permission, notifications, Device Admin, Google Drive backup, automatic backup, and optional backup of Expenses and Habits.",
        "Users can use local encrypted backup without Google Drive by creating a local backup file.",
        "Users can stop future Drive backups by turning automatic backup off or removing the backup password.",
      ],
    },
    {
      title: "Children",
      body: [
        "DayKit is a general utility app and is not directed to children. The app does not knowingly collect children's personal information.",
      ],
    },
    {
      title: "Changes And Contact",
      body: [
        "This privacy policy may be updated as the app changes. The current policy should be available inside the app and through the Google Play listing.",
        "For privacy questions, use the developer contact information provided on the Google Play Store listing for DayKit.",
      ],
    },
  ],
};
