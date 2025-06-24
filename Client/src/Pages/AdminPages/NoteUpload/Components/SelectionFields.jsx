/* eslint-disable react/prop-types */

const SelectionFields = ({
    formData,
    handleChange,
    DynamicSession,
    DynamicCourse,
    DynamicBranch,
    DynamicSemester,
    subjectsByBranchAndSemester,
}) => {
    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Session
                </label>
                <select
                    name="session"
                    className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    onChange={handleChange}
                    value={formData.session}
                    required
                >
                    <option value="">Select Session</option>
                    {DynamicSession.map((session, index) => (
                        <option key={index} value={session}>
                            {session}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Course
                </label>
                <select
                    name="course"
                    className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    onChange={handleChange}
                    value={formData.course}
                    required
                >
                    <option value="">Select Course</option>
                    {DynamicCourse.map((course, index) => (
                        <option key={index} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Branch
                </label>
                <select
                    name="branch"
                    className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    onChange={handleChange}
                    value={formData.branch}
                    required
                >
                    <option value="">Select Branch</option>
                    {DynamicBranch.map((branch, index) => (
                        <option key={index} value={branch}>
                            {branch}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Semester
                </label>
                <select
                    name="semester"
                    className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    onChange={handleChange}
                    value={formData.semester}
                    required
                >
                    <option value="">Select Semester</option>
                    {DynamicSemester.map((semester, index) => (
                        <option key={index} value={semester}>
                            {semester}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-span-1 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                </label>
                <select
                    name="subject"
                    className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    onChange={handleChange}
                    value={formData.subject}
                    required
                    disabled={!formData.semester || !formData.branch}
                >
                    <option value="">Select Subject</option>
                    {formData.semester &&
                        formData.branch &&
                        subjectsByBranchAndSemester[formData.branch]?.[
                            formData.semester
                        ]?.map((subject, index) => (
                            <option key={index} value={subject}>
                                {subject}
                            </option>
                        ))}
                </select>
                {!formData.semester && (
                    <p className="text-xs text-blue-300 mt-1">
                        Select a semester first to view subjects
                    </p>
                )}
                {formData.semester && !formData.branch && (
                    <p className="text-xs text-blue-300 mt-1">
                        Select a branch first to view subjects
                    </p>
                )}
            </div>
        </>
    );
};

export default SelectionFields;
