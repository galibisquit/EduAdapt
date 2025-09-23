import React, { useState } from 'react';
import { ArrowLeft, Users, TrendingUp, BookOpen, Clock, Search, Filter, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { mockStudentProgress } from '../utils/mockData';
import { StudentProgress } from '../types';

interface TeacherDashboardProps {
  onBack: () => void;
}

export default function TeacherDashboard({ onBack }: TeacherDashboardProps) {
  const [students] = useState<StudentProgress[]>(mockStudentProgress);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || student.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const stats = {
    totalStudents: students.length,
    avgConfidence: Math.round(students.reduce((sum, s) => sum + s.confidence, 0) / students.length),
    understandsCount: students.filter(s => s.understandingLevel === 'understands').length,
    needsHelpCount: students.filter(s => s.understandingLevel === 'needs-remedial').length
  };

  const getUnderstandingColor = (level: string) => {
    switch (level) {
      case 'understands': return 'text-success-700 bg-success-100';
      case 'partial': return 'text-warning-700 bg-warning-100';
      case 'needs-remedial': return 'text-error-700 bg-error-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getUnderstandingText = (level: string) => {
    switch (level) {
      case 'understands': return 'Understands';
      case 'partial': return 'Partial';
      case 'needs-remedial': return 'Needs Help';
      default: return level;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Monitor student progress and learning analytics</p>
            </div>
          </div>
          
          <Button className="gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 gradient-primary rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-success-400 to-success-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgConfidence}%</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 gradient-secondary rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Understanding Well</p>
                <p className="text-2xl font-bold text-gray-900">{stats.understandsCount}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-warning-400 to-warning-600 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Need Support</p>
                <p className="text-2xl font-bold text-gray-900">{stats.needsHelpCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-effect rounded-2xl p-8">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="students">All Students</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Recent Student Submissions</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Subjects</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{student.subject}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUnderstandingColor(student.understandingLevel)}`}>
                            {getUnderstandingText(student.understandingLevel)}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-3 line-clamp-2">
                          {student.answer}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Confidence: {student.confidence}%</span>
                          <span>•</span>
                          <span>{formatTime(student.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div className="text-right">
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-700">{student.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Class Performance Analytics</h2>
              
              {/* Understanding Level Distribution */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Understanding Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Understands Well</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-success-500 h-2 rounded-full" 
                            style={{ width: `${(stats.understandsCount / stats.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{stats.understandsCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Partial Understanding</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-warning-500 h-2 rounded-full" 
                            style={{ width: `${((stats.totalStudents - stats.understandsCount - stats.needsHelpCount) / stats.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{stats.totalStudents - stats.understandsCount - stats.needsHelpCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Needs Support</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-error-500 h-2 rounded-full" 
                            style={{ width: `${(stats.needsHelpCount / stats.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{stats.needsHelpCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Subject Performance</h3>
                  <div className="space-y-3">
                    {['Mathematics', 'Science', 'English', 'History'].map((subject) => {
                      const subjectStudents = students.filter(s => s.subject === subject);
                      const avgConf = subjectStudents.length > 0 
                        ? Math.round(subjectStudents.reduce((sum, s) => sum + s.confidence, 0) / subjectStudents.length)
                        : 0;
                      
                      return (
                        <div key={subject} className="flex items-center justify-between">
                          <span className="text-gray-700">{subject}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="gradient-primary h-2 rounded-full" 
                                style={{ width: `${avgConf}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{avgConf}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">All Students</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Understanding</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Confidence</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{student.name}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{student.subject}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUnderstandingColor(student.understandingLevel)}`}>
                            {getUnderstandingText(student.understandingLevel)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="gradient-primary h-2 rounded-full" 
                                style={{ width: `${student.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{student.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {formatTime(student.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}