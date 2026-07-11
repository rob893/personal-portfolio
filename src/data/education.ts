export interface Education {
  degree: string;
  field: string;
  school: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
}

export const education: Education[] = [
  {
    degree: 'Master of Science',
    field: 'Software Engineering',
    school: 'Kennesaw State University',
    location: 'Kennesaw, GA',
    start: 'Jan 2017',
    end: 'Dec 2018',
    detail: 'GPA: 4.0'
  },
  {
    degree: 'Graduate Certificate',
    field: 'Computer Science Foundations',
    school: 'Kennesaw State University',
    location: 'Kennesaw, GA',
    start: 'Aug 2016',
    end: 'Dec 2016',
    detail: 'GPA: 4.0'
  },
  {
    degree: 'Bachelor of Science',
    field: 'Criminology',
    school: 'University of West Georgia',
    location: 'Carrollton, GA',
    start: 'Dec 2010',
    end: 'May 2015',
    detail: 'GPA: 3.98'
  }
];

export const awards: string[] = [
  'Azure Impact Award (2023, 2024)',
  'Summa Cum Laude Graduate (2018)',
  'Best Graduating Graduate Student (2018)',
  'Summa Cum Laude Graduate (2015)',
  'Dean\u2019s List for 8 consecutive years across three universities (2010\u20132018)',
  'Ingram Scholar Recipient \u2014 requiring a 3.75+ cumulative GPA (2015)',
  'Distinguished Honor Graduate of the Army Warrior Leadership Course (2013)',
  'Honor Graduate of the U.S. Army Chemical School, class 22-10 (2010)'
];
