// api.ts
import { StudentInfo, CourseResult } from './types';

export async function fetchStudentInfo(studentId: string): Promise<StudentInfo> {

  const response = await fetch(`/api/studentInfo?studentId=${studentId}`);
  if (!response.ok) {
    throw new Error(`Error fetching student info: ${response.statusText}`);

  }
  return response.json();
}

export async function fetchCourseResults(studentId: string): Promise<CourseResult[]> {
  const semesters = [
    "251"
  ];

  let allResults: CourseResult[] = [];

  for (const semester of semesters) {
    try {
      const response = await fetch(

        `/api/courseResults?semesterId=${semester}&studentId=${studentId}`
      );
      if (!response.ok) {
        console.warn(`Skipping semester ${semester} due to error: ${response.statusText}`);

        continue;
      }
      const results = await response.json();
      allResults = allResults.concat(results);
    } catch (error) {
      console.log(`Failed to fetch results for semester ${semester}:, error`);
    }
  }

  return allResults;
}
