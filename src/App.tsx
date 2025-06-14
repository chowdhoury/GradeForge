import React, { useState, useEffect } from 'react';
import { GraduationCap, Moon, Sun } from 'lucide-react';
//import { StudentInfo } from './types';
import { fetchCourseResults } from './api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function App() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentInfo | null>(null);
  const [courseResults, setCourseResults] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );
  const [inquiryCount, setInquiryCount] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetchStudentInfo();
    }
  };

  const handleFetchStudentInfo = async () => {
    if (!studentId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // const info = await fetchStudentInfo(studentId);
      // setStudentData(info);
      
      const results = await fetchCourseResults(studentId);
      setCourseResults(results);

      setInquiryCount(prevCount => prevCount + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] transition-colors duration-300">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
          <DotLottieReact
            src="https://lottie.host/f5c4c1fb-d2cf-4bc7-b636-5412e3f5d306/wupt2ulqzA.lottie"
            loop
            autoplay
            style={{ width: '500px', height: '500px' }}
          />
        </div>
      )}

      {/* Page Content */}
      <div className={`${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <header className="bg-[var(--primary)] shadow-md mb-10 relative">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-6">
              {/* Centered Header Content */}
              <div className="flex items-center gap-4">
                <GraduationCap className="w-10 h-10 text-white" />
                <h1 className="text-2xl font-semibold text-white">DIU Academic Transcript</h1>
              </div>

              {/* Inquiry Counter (Positioned Absolutely) */}
              <div 
                className="absolute right-4 rounded-full h-12 flex items-center justify-center shadow-lg px-4"
                style={{
                  backgroundColor: 'var(--primary)', // Same as header background
                  color: 'white', // Same as header text color
                  border: `2px solid ${theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`, // Dynamic border color with 50% opacity
                }}
              >
                Total Generated: {inquiryCount}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4">
          <div className="bg-[var(--card-bg)] rounded-xl p-8 shadow-md mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Student ID (e.g., 0242310005341002)"
                className="flex-1 p-4 border-2 border-[var(--border)] rounded-lg text-base bg-[var(--card-bg)] text-[var(--text)] transition-colors duration-300 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
              />
              <button
                onClick={handleFetchStudentInfo}
                className="px-8 py-4 bg-[var(--primary)] text-white rounded-lg font-bold hover:bg-[var(--primary-hover)] transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Transcript
              </button>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl p-8 shadow-md">
            {error && <div className="text-red-500">⚠️ {error}</div>}
            
            {studentData && !error && (
              <>
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[var(--primary)] mb-6 pb-2 border-b-2 border-[var(--border)]">
                    Student Profile
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Full Name</span>
                      <span className="font-medium">{studentData.studentName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Student ID</span>
                      <span className="font-medium">{studentData.studentId}</span>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[var(--primary)] mb-6 pb-2 border-b-2 border-[var(--border)]">
                    Academic Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Program</span>
                      <span className="font-medium">{studentData.programName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Department</span>
                      <span className="font-medium">{studentData.departmentName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Enrolled Semester</span>
                      <span className="font-medium">{studentData.semesterName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Batch</span>
                      <span className="font-medium">{studentData.batchId.split('-')[1]}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[var(--primary)] mb-6 pb-2 border-b-2 border-[var(--border)]">
                    Course Results
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">Semester</th>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">Course Code</th>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">Course Title</th>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">Credit</th>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">Grade</th>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">Point</th>
                          <th className="p-4 text-left bg-[var(--primary)] text-white font-semibold">CGPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseResults.map((course, index) => (
                          <tr
                            key={index}
                          >
                            <td className="p-4 border-b border-[var(--border)]">{course.semesterName}-{course.semesterYear}</td>
                            <td className="p-4 border-b border-[var(--border)]">{course.customCourseId}</td>
                            <td className="p-4 border-b border-[var(--border)]">{course.courseTitle}</td>
                            <td className="p-4 border-b border-[var(--border)]">{course.totalCredit}</td>
                            <td className="p-4 border-b border-[var(--border)]">{course.gradeLetter}</td>
                            <td className="p-4 border-b border-[var(--border)]">{course.pointEquivalent}</td>
                            <td className="p-4 border-b border-[var(--border)]">{course.cgpa}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}
          </div>
        </main>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </div>
  );
}

export default App;
