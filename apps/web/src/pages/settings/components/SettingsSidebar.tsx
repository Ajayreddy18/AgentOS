export function SettingsSidebar() {
  return (
    <div
      className="
                rounded-xl
                border
                bg-card
                p-5
                space-y-5
            "
    >
      <h3 className="font-semibold">Quick Navigation</h3>

      <div className="space-y-3 text-sm">
        <p>👤 Profile</p>

        <p>⚙ Preferences</p>
      </div>
    </div>
  );
}
