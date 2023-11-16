export default function ProfileSidebar() {
    return (
      <div className="w-64 h-screen bg-blue-100 p-5 text-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full mb-3"></div>
          <h2 className="font-bold mb-2">Atakan Kirac</h2>
          <span>31 years old</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Height</span>
            <span>190 cm</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Weight</span>
            <span>80 kg</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Heart Rate</span>
            <span>75 bpm</span>
          </div>
          <div className="flex items-center justify-between">
            <span>VO2 Max</span>
            <span>82 mL/kg</span>
          </div>
        </div>
      </div>
    );
  }
  