export type BDJSON = {
  bangladesh: {
    divisions: {
      name: string;
      districts: {
        name: string;
        police_stations: { name: string; postal_code: string }[];
      }[];
    }[];
  };
};

export type PSInfo = { name: string; postalCode: string };

export type RegisterFormValues = {
  password: string;
  landlord: {
    name: {
      firstName: string;
      lastName: string;
    };
    email?: string;
    gender: 'male' | 'female' | 'other' | '';
    profilePicture?: string; // Base64 data URL
    address: {
      villaName: string;
      division: string;
      district: string;
      policeStation: string;
      areaName: string;
      roadName: string;
      postalCode: string;
      phoneNumber: string;
      houseNumber: string;
      floorNumber: string;
      directions: string;
      flatNumber: string;
      block: string;
      landmark: string;
    };
  };
};

export type Step = 0 | 1 | 2 | 3 | 4;
