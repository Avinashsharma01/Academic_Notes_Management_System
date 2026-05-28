import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";
import {
    FaPlus, FaTrash, FaEdit, FaSpinner, FaCalendarAlt,
    FaGraduationCap, FaCodeBranch, FaLayerGroup, FaBook,
    FaShieldAlt, FaSignOutAlt, FaTimes, FaCheck, FaArrowLeft,
} from "react-icons/fa";

const TABS = [
    { key: "sessions", label: "Sessions", icon: <FaCalendarAlt /> },
    { key: "courses", label: "Courses", icon: <FaGraduationCap /> },
    { key: "branches", label: "Branches", icon: <FaCodeBranch /> },
    { key: "semesters", label: "Semesters", icon: <FaLayerGroup /> },
    { key: "subjects", label: "Subjects", icon: <FaBook /> },
];

const AcademicManagement = () => {
    const { superAdmin, superAdminLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("sessions");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [error, setError] = useState("");

    // Dependent data for dropdowns
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [semesters, setSemesters] = useState([]);

    // Form state
    const [form, setForm] = useState({});

    // Fetch data when tab changes
    useEffect(() => {
        fetchData();
        fetchDependencies();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const { data: result } = await API.get(`/academic/${activeTab}`);
            setData(Array.isArray(result) ? result : []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const fetchDependencies = async () => {
        try {
            if (["branches", "semesters", "subjects"].includes(activeTab)) {
                const { data: c } = await API.get("/academic/courses");
                setCourses(c);
            }
            if (activeTab === "subjects") {
                const { data: b } = await API.get("/academic/branches");
                setBranches(b);
                const { data: s } = await API.get("/academic/semesters");
                setSemesters(s);
            }
        } catch (err) {
            console.error("Dependencies error:", err);
        }
    };

    const handleCreate = async () => {
        setActionLoading("create");
        try {
            await API.post(`/academic/${activeTab}`, form);
            setShowForm(false);
            setForm({});
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create");
        } finally {
            setActionLoading(null);
        }
    };

    const handleUpdate = async () => {
        setActionLoading("update");
        try {
            await API.put(`/academic/${activeTab}/${editingItem._id}`, form);
            setEditingItem(null);
            setShowForm(false);
            setForm({});
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this item? Related data will also be removed.")) return;
        setActionLoading(id);
        try {
            await API.delete(`/academic/${activeTab}/${id}`);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete");
        } finally {
            setActionLoading(null);
        }
    };

    const startEdit = (item) => {
        setEditingItem(item);
        setForm({ ...item });
        setShowForm(true);
    };

    const startCreate = () => {
        setEditingItem(null);
        setForm({});
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setForm({});
        setError("");
    };

    // Render form fields based on active tab
    const renderFormFields = () => {
        const inputClass = "w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500";
        const labelClass = "block text-sm font-medium text-gray-300 mb-1";

        switch (activeTab) {
            case "sessions":
                return (
                    <>
                        <div>
                            <label className={labelClass}>Year *</label>
                            <input type="number" className={inputClass} placeholder="2024" value={form.year || ""} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={labelClass}>Start Year *</label>
                            <input type="number" className={inputClass} placeholder="2024" value={form.startYear || ""} onChange={(e) => setForm({ ...form, startYear: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={labelClass}>End Year *</label>
                            <input type="number" className={inputClass} placeholder="2028" value={form.endYear || ""} onChange={(e) => setForm({ ...form, endYear: Number(e.target.value) })} />
                        </div>
                    </>
                );
            case "courses":
                return (
                    <>
                        <div>
                            <label className={labelClass}>Name *</label>
                            <input type="text" className={inputClass} placeholder="B.Tech" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Code *</label>
                            <input type="text" className={inputClass} placeholder="btech" value={form.code || ""} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Description</label>
                            <input type="text" className={inputClass} placeholder="Bachelor of Technology" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                    </>
                );
            case "branches":
                return (
                    <>
                        <div>
                            <label className={labelClass}>Name *</label>
                            <input type="text" className={inputClass} placeholder="CSE" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <input type="text" className={inputClass} placeholder="Computer Science & Engineering" value={form.fullName || ""} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Code *</label>
                            <input type="text" className={inputClass} placeholder="cse" value={form.code || ""} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Course *</label>
                            <select className={inputClass} value={form.course?._id || form.course || ""} onChange={(e) => setForm({ ...form, course: e.target.value })}>
                                <option value="">Select Course</option>
                                {courses.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                            </select>
                        </div>
                    </>
                );
            case "semesters":
                return (
                    <>
                        <div>
                            <label className={labelClass}>Name *</label>
                            <input type="text" className={inputClass} placeholder="Semester 1" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Number *</label>
                            <input type="number" className={inputClass} placeholder="1" min="1" max="12" value={form.number || ""} onChange={(e) => setForm({ ...form, number: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={labelClass}>Course *</label>
                            <select className={inputClass} value={form.course?._id || form.course || ""} onChange={(e) => setForm({ ...form, course: e.target.value })}>
                                <option value="">Select Course</option>
                                {courses.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                            </select>
                        </div>
                    </>
                );
            case "subjects":
                return (
                    <>
                        <div>
                            <label className={labelClass}>Name *</label>
                            <input type="text" className={inputClass} placeholder="Data Structures" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Code</label>
                            <input type="text" className={inputClass} placeholder="CS201" value={form.code || ""} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Course *</label>
                            <select className={inputClass} value={form.course?._id || form.course || ""} onChange={(e) => setForm({ ...form, course: e.target.value })}>
                                <option value="">Select Course</option>
                                {courses.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Branch *</label>
                            <select className={inputClass} value={form.branch?._id || form.branch || ""} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                                <option value="">Select Branch</option>
                                {branches.filter((b) => !form.course || b.course?._id === form.course || b.course === form.course).map((b) => (<option key={b._id} value={b._id}>{b.name}</option>))}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Semester *</label>
                            <select className={inputClass} value={form.semester?._id || form.semester || ""} onChange={(e) => setForm({ ...form, semester: e.target.value })}>
                                <option value="">Select Semester</option>
                                {semesters.filter((s) => !form.course || s.course?._id === form.course || s.course === form.course).map((s) => (<option key={s._id} value={s._id}>{s.name}</option>))}
                            </select>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    // Render table columns based on tab
    const getColumns = () => {
        switch (activeTab) {
            case "sessions": return ["Year", "Start Year", "End Year"];
            case "courses": return ["Name", "Code", "Description"];
            case "branches": return ["Name", "Full Name", "Code", "Course"];
            case "semesters": return ["Name", "Number", "Course"];
            case "subjects": return ["Name", "Code", "Branch", "Semester"];
            default: return [];
        }
    };

    const getCellValue = (item, col) => {
        switch (col) {
            case "Year": return item.year;
            case "Start Year": return item.startYear;
            case "End Year": return item.endYear;
            case "Name": return item.name;
            case "Code": return item.code;
            case "Description": return item.description || "—";
            case "Full Name": return item.fullName || "—";
            case "Course": return item.course?.name || "—";
            case "Number": return item.number;
            case "Branch": return item.branch?.name || "—";
            case "Semester": return item.semester?.name || "—";
            default: return "—";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Header */}
            <div className="bg-gray-800/80 border-b border-purple-500/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate("/superadmin/dashboard")} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all">
                            <FaArrowLeft />
                        </button>
                        <div className="bg-purple-600/20 p-3 rounded-lg">
                            <FaShieldAlt className="text-purple-400 text-xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Academic Data Management</h1>
                            <p className="text-gray-400 text-sm">Manage sessions, courses, branches, semesters & subjects</p>
                        </div>
                    </div>
                    <button onClick={async () => { await superAdminLogout(); navigate("/superadmin/login"); }} className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => { setActiveTab(tab.key); setShowForm(false); setError(""); }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${activeTab === tab.key
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            {tab.icon} {tab.label}
                            <span className="bg-gray-700/50 text-xs px-2 py-0.5 rounded-full">{activeTab === tab.key ? data.length : ""}</span>
                        </button>
                    ))}
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={() => setError("")} className="text-red-400 hover:text-red-300"><FaTimes /></button>
                    </div>
                )}

                {/* Create Button */}
                {!showForm && (
                    <button onClick={startCreate} className="mb-6 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg">
                        <FaPlus /> Add New {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                    </button>
                )}

                {/* Form */}
                {showForm && (
                    <div className="bg-gray-800 rounded-xl border border-gray-700/50 p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-4">{editingItem ? "Edit" : "Create"} {activeTab.slice(0, -1)}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {renderFormFields()}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={editingItem ? handleUpdate : handleCreate}
                                disabled={actionLoading === "create" || actionLoading === "update"}
                                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {(actionLoading === "create" || actionLoading === "update") ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                                {editingItem ? "Update" : "Create"}
                            </button>
                            <button onClick={cancelForm} className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700/50">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <FaSpinner className="animate-spin text-3xl text-purple-500" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">#</th>
                                        {getColumns().map((col) => (
                                            <th key={col} className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">{col}</th>
                                        ))}
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {data.length > 0 ? data.map((item, idx) => (
                                        <tr key={item._id} className="hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500">{idx + 1}</td>
                                            {getColumns().map((col) => (
                                                <td key={col} className="px-6 py-4 text-sm text-gray-300">{getCellValue(item, col)}</td>
                                            ))}
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button onClick={() => startEdit(item)} className="p-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50" title="Edit">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id)} disabled={actionLoading === item._id} className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50" title="Delete">
                                                        {actionLoading === item._id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={getColumns().length + 2} className="px-6 py-16 text-center text-gray-500">
                                                No {activeTab} found. Click &quot;Add New&quot; to create one.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcademicManagement;
