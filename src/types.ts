export interface StudentInfo {
  studentId: string;
  studentName: string;
  programName: string;
  departmentName: string;
  semesterName: string;
  batchId: string;
}

export interface CourseResult {
  semesterId: string;
  customCourseId: string;
  courseTitle: string;
  totalCredit: number;
  gradeLetter: string;
  pointEquivalent: number;
  cgpa: number;
}