interface PersonInformation {
  adult: boolean;
  known_for: any[];
  name: string;
  popularity: number;
  profile_path: string;
}

export interface Person {
  personData: PersonInformation;
}
