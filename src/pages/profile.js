export default function Profile() {
    // TODO: Placeholder user data - replace with actual data from your authentication state or API
    const userData = {
      name: "Jane Doe",
      age: 30,
      height: "170 cm",
      weight: "65 kg",
      heartRate: "72 bpm",
      vo2Max: "38 mL/kg/min",
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">User Profile</h3>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="name">Name</label>
              <div className="px-4 py-2 border rounded-md" id="name">{userData.name}</div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="age">Age</label>
              <div className="px-4 py-2 border rounded-md" id="age">{userData.age}</div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="height">Height</label>
              <div className="px-4 py-2 border rounded-md" id="height">{userData.height}</div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="weight">Weight</label>
              <div className="px-4 py-2 border rounded-md" id="weight">{userData.weight}</div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="heartRate">Heart Rate</label>
              <div className="px-4 py-2 border rounded-md" id="heartRate">{userData.heartRate}</div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="vo2Max">VO2 Max</label>
              <div className="px-4 py-2 border rounded-md" id="vo2Max">{userData.vo2Max}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  