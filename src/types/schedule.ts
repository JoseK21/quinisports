export type Schedule = {
  id: string;
  idBusiness: string;

  mondayOpening?: number;
  mondayClose?: number;
  tuesdayOpening?: number;
  tuesdayClose?: number;
  wednesdayOpening?: number;
  wednesdayClose?: number;
  thursdayOpening?: number;
  thursdayClose?: number;
  fridayOpening?: number;
  fridayClose?: number;
  saturdayOpening?: number;
  saturdayClose?: number;
  sundayOpening?: number;
  sundayClose?: number;
};
