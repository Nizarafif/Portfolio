/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  FolderGit, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Cpu, 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  Loader2, 
  X,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

type TabType = "projects" | "experiences" | "education" | "certifications" | "skills";

export default function AdminPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: "",
    role: "",
    problem: "",
    solution: "",
    result: "",
    tech: "",
    github: "",
    demo: "",
    image_url: "",
  });

  const [experienceForm, setExperienceForm] = useState({
    role: "",
    company: "",
    period: "",
    description: "",
  });

  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    period: "",
  });

  const [certificationForm, setCertificationForm] = useState({
    name: "",
    issuer: "",
    year: "",
    file_url: "",
  });

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "frontend",
    icon_name: "",
    color_class: "",
  });

  // File Upload State
  const [uploadingFile, setUploadingFile] = useState(false);

  // Fetch Items
  const fetchItems = async (tab: TabType) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from(tab)
        .select("*")
        .order("created_at", { ascending: tab === "projects" || tab === "skills" ? true : false });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      showToast(err.message || "Gagal mengambil data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    resetForms();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    if (activeTab === "projects") {
      setProjectForm({
        title: item.title,
        role: item.role,
        problem: item.problem,
        solution: item.solution,
        result: item.result,
        tech: item.tech.join(", "),
        github: item.github,
        demo: item.demo || "",
        image_url: item.image_url || "",
      });
    } else if (activeTab === "experiences") {
      setExperienceForm({
        role: item.role,
        company: item.company,
        period: item.period,
        description: item.description,
      });
    } else if (activeTab === "education") {
      setEducationForm({
        degree: item.degree,
        institution: item.institution,
        period: item.period,
      });
    } else if (activeTab === "certifications") {
      setCertificationForm({
        name: item.name,
        issuer: item.issuer,
        year: item.year,
        file_url: item.file_url || "",
      });
    } else if (activeTab === "skills") {
      setSkillForm({
        name: item.name,
        category: item.category,
        icon_name: item.icon_name,
        color_class: item.color_class,
      });
    }
    setIsModalOpen(true);
  };

  const resetForms = () => {
    setProjectForm({ title: "", role: "", problem: "", solution: "", result: "", tech: "", github: "", demo: "", image_url: "" });
    setExperienceForm({ role: "", company: "", period: "", description: "" });
    setEducationForm({ degree: "", institution: "", period: "" });
    setCertificationForm({ name: "", issuer: "", year: "", file_url: "" });
    setSkillForm({ name: "", category: "frontend", icon_name: "", color_class: "" });
  };

  // Upload to Supabase Storage
  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${activeTab}/${fileName}`;

      const { error } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(filePath);

      if (activeTab === "projects") {
        setProjectForm(prev => ({ ...prev, image_url: publicUrl }));
      } else if (activeTab === "certifications") {
        setCertificationForm(prev => ({ ...prev, file_url: publicUrl }));
      }
      
      showToast("Berkas berhasil diunggah!", "success");
    } catch (err: any) {
      showToast(err.message || "Gagal mengunggah berkas", "error");
    } finally {
      setUploadingFile(false);
    }
  };

  // Submit Form (Add or Edit)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload: any = {};
      
      if (activeTab === "projects") {
        payload = {
          ...projectForm,
          tech: projectForm.tech.split(",").map(t => t.trim()).filter(Boolean),
          demo: projectForm.demo || null,
          image_url: projectForm.image_url || null,
        };
      } else if (activeTab === "experiences") {
        payload = { ...experienceForm };
      } else if (activeTab === "education") {
        payload = { ...educationForm };
      } else if (activeTab === "certifications") {
        payload = {
          ...certificationForm,
          file_url: certificationForm.file_url || null,
        };
      } else if (activeTab === "skills") {
        payload = { ...skillForm };
      }

      if (editingItem) {
        // Update Operation
        const { error } = await supabase
          .from(activeTab)
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
        showToast("Data berhasil diperbarui!", "success");
      } else {
        // Insert Operation
        const { error } = await supabase
          .from(activeTab)
          .insert([payload]);

        if (error) throw error;
        showToast("Data berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      resetForms();
      fetchItems(activeTab);
    } catch (err: any) {
      showToast(err.message || "Terjadi kesalahan", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Operation
  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const { error } = await supabase
        .from(activeTab)
        .delete()
        .eq("id", id);

      if (error) throw error;
      showToast("Data berhasil dihapus!", "success");
      fetchItems(activeTab);
    } catch (err: any) {
      showToast(err.message || "Gagal menghapus data", "error");
    }
  };

  const tabs = [
    { id: "projects", label: "Proyek", icon: FolderGit },
    { id: "experiences", label: "Pengalaman", icon: Briefcase },
    { id: "education", label: "Pendidikan", icon: GraduationCap },
    { id: "certifications", label: "Sertifikasi", icon: Award },
    { id: "skills", label: "Keahlian", icon: Cpu },
  ];

  return (
    <div className="flex-1 p-6 md:p-10 relative">
      {/* Header Halaman */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Portofolio</h1>
          <p className="text-xs text-slate-400 mt-1">Kelola data portofolio pribadi Anda dengan mudah</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-teal-700/20 transition-all hover:bg-teal-500 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Baru</span>
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive 
                  ? "bg-slate-800 text-teal-400 border border-slate-700 shadow" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex h-64 w-full flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
          <span className="text-xs">Mengambil data dari Supabase...</span>
        </div>
      ) : (
        <div className="border border-slate-800 bg-slate-950/40 rounded-xl overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-2">
              <AlertTriangle className="h-10 w-10 text-slate-600" />
              <p className="text-sm font-semibold">Belum ada data</p>
              <p className="text-xs">Klik tombol &quot;Tambah Baru&quot; untuk menginput data pertama.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="p-4">Info Utama</th>
                    {activeTab === "projects" && <th className="p-4">Peran & Teknologi</th>}
                    {activeTab === "experiences" && <th className="p-4">Perusahaan & Periode</th>}
                    {activeTab === "education" && <th className="p-4">Institusi & Periode</th>}
                    {activeTab === "certifications" && <th className="p-4">Penerbit & Tahun</th>}
                    {activeTab === "skills" && <th className="p-4">Kategori & Visual</th>}
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/20 transition-colors text-slate-300">
                      <td className="p-4 font-semibold text-white">
                        {activeTab === "projects" && item.title}
                        {activeTab === "experiences" && item.role}
                        {activeTab === "education" && item.degree}
                        {activeTab === "certifications" && item.name}
                        {activeTab === "skills" && item.name}
                      </td>
                      {/* Projects Specific Columns */}
                      {activeTab === "projects" && (
                        <td className="p-4">
                          <div className="font-medium text-slate-400 mb-1">{item.role}</div>
                          <div className="flex flex-wrap gap-1">
                            {item.tech.map((t: string) => (
                              <span key={t} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                      )}
                      {/* Experiences Specific Columns */}
                      {activeTab === "experiences" && (
                        <td className="p-4">
                          <div className="font-medium text-slate-300">{item.company}</div>
                          <div className="text-[10px] text-slate-500">{item.period}</div>
                        </td>
                      )}
                      {/* Education Specific Columns */}
                      {activeTab === "education" && (
                        <td className="p-4">
                          <div className="font-medium text-slate-300">{item.institution}</div>
                          <div className="text-[10px] text-slate-500">{item.period}</div>
                        </td>
                      )}
                      {/* Certifications Specific Columns */}
                      {activeTab === "certifications" && (
                        <td className="p-4">
                          <div className="font-medium text-slate-300">{item.issuer}</div>
                          <div className="text-[10px] text-slate-500">{item.year}</div>
                        </td>
                      )}
                      {/* Skills Specific Columns */}
                      {activeTab === "skills" && (
                        <td className="p-4">
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-teal-400 uppercase">
                            {item.category}
                          </span>
                          <span className={`ml-3 font-semibold ${item.color_class || "text-white"}`}>
                            {item.icon_name}
                          </span>
                        </td>
                      )}
                      {/* Operations */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded bg-red-950/40 text-red-400 hover:text-red-300 hover:bg-red-950/80 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Form Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl p-6 md:p-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white">
                {editingItem ? "Edit Data" : "Tambah Data Baru"} - {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Bidang Dinamik berdasarkan Tab */}
              
              {/* === PROJECTS FORM === */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Proyek</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: E-Commerce App"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Peran (Role)</label>
                      <input
                        type="text"
                        required
                        value={projectForm.role}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: Fullstack Developer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Latar Belakang / Masalah (Problem)</label>
                    <textarea
                      required
                      rows={2}
                      value={projectForm.problem}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, problem: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white resize-none"
                      placeholder="Masalah yang melatarbelakangi proyek ini..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Solusi / Pendekatan (Solution)</label>
                    <textarea
                      required
                      rows={2}
                      value={projectForm.solution}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, solution: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white resize-none"
                      placeholder="Solusi dan pendekatan teknologi yang digunakan..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Hasil / Fitur Utama (Result)</label>
                    <textarea
                      required
                      rows={2}
                      value={projectForm.result}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, result: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white resize-none"
                      placeholder="Fitur utama dan hasil kinerja dari proyek..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Teknologi (Pisahkan dengan koma)</label>
                    <input
                      type="text"
                      required
                      value={projectForm.tech}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, tech: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      placeholder="Contoh: React, TypeScript, Tailwind CSS"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tautan GitHub</label>
                      <input
                        type="url"
                        required
                        value={projectForm.github}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, github: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tautan Live Demo (Opsional)</label>
                      <input
                        type="url"
                        value={projectForm.demo}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, demo: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Upload Gambar Proyek */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Gambar Proyek</label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        type="text"
                        value={projectForm.image_url}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, image_url: e.target.value }))}
                        className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="URL Gambar atau unggah berkas di samping"
                      />
                      <label className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white border border-slate-700 cursor-pointer hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50">
                        {uploadingFile ? <Loader2 className="h-4 w-4 animate-spin text-teal-400" /> : <Upload className="h-4 w-4" />}
                        <span>Unggah File</span>
                        <input type="file" accept="image/*" onChange={handleUploadFile} className="hidden" disabled={uploadingFile} />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* === EXPERIENCES FORM === */}
              {activeTab === "experiences" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Peran (Role)</label>
                      <input
                        type="text"
                        required
                        value={experienceForm.role}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: Intern Full Stack Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Perusahaan / Organisasi</label>
                      <input
                        type="text"
                        required
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: PT Taman Media Indonesia"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Periode Pengalaman</label>
                    <input
                      type="text"
                      required
                      value={experienceForm.period}
                      onChange={(e) => setExperienceForm(prev => ({ ...prev, period: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      placeholder="Contoh: 2025 ATAU 2023 - 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Deskripsi Kegiatan</label>
                    <textarea
                      required
                      rows={4}
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white resize-none"
                      placeholder="Tulis deskripsi tugas dan hasil pekerjaan Anda secara detail..."
                    />
                  </div>
                </div>
              )}

              {/* === EDUCATION FORM === */}
              {activeTab === "education" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Gelar / Jurusan</label>
                    <input
                      type="text"
                      required
                      value={educationForm.degree}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      placeholder="Contoh: Rekayasa Perangkat Lunak"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Institusi Pendidikan</label>
                    <input
                      type="text"
                      required
                      value={educationForm.institution}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, institution: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      placeholder="Contoh: Politeknik Balekambang"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Periode Pendidikan</label>
                    <input
                      type="text"
                      required
                      value={educationForm.period}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, period: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      placeholder="Contoh: 2019 - 2022"
                    />
                  </div>
                </div>
              )}

              {/* === CERTIFICATIONS FORM === */}
              {activeTab === "certifications" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Sertifikasi / Pelatihan</label>
                      <input
                        type="text"
                        required
                        value={certificationForm.name}
                        onChange={(e) => setCertificationForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: JavaScript Algorithms"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Penerbit Sertifikat</label>
                      <input
                        type="text"
                        required
                        value={certificationForm.issuer}
                        onChange={(e) => setCertificationForm(prev => ({ ...prev, issuer: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: Dicoding Indonesia"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tahun Penerbitan</label>
                    <input
                      type="text"
                      required
                      value={certificationForm.year}
                      onChange={(e) => setCertificationForm(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      placeholder="Contoh: 2023"
                    />
                  </div>

                  {/* Upload Berkas Sertifikat */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Berkas Sertifikat (Opsional)</label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        type="text"
                        value={certificationForm.file_url}
                        onChange={(e) => setCertificationForm(prev => ({ ...prev, file_url: e.target.value }))}
                        className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="URL File PDF atau unggah berkas di samping"
                      />
                      <label className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white border border-slate-700 cursor-pointer hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50">
                        {uploadingFile ? <Loader2 className="h-4 w-4 animate-spin text-teal-400" /> : <Upload className="h-4 w-4" />}
                        <span>Unggah PDF</span>
                        <input type="file" accept="application/pdf" onChange={handleUploadFile} className="hidden" disabled={uploadingFile} />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* === SKILLS FORM === */}
              {activeTab === "skills" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Keahlian</label>
                      <input
                        type="text"
                        required
                        value={skillForm.name}
                        onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: Next.js"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Kategori</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Ikon React-Icons (Simple Icons/VSCode)</label>
                      <input
                        type="text"
                        required
                        value={skillForm.icon_name}
                        onChange={(e) => setSkillForm(prev => ({ ...prev, icon_name: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: SiNextdotjs atau VscVscode"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Warna Tailwind Ikon</label>
                      <input
                        type="text"
                        required
                        value={skillForm.color_class}
                        onChange={(e) => setSkillForm(prev => ({ ...prev, color_class: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        placeholder="Contoh: text-slate-900 atau text-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-800 bg-transparent px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingFile}
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-teal-500 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin text-white" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    "Simpan Data"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-xs shadow-2xl border bg-slate-950 animate-bounce" style={{ animationDuration: '4s' }}>
          {toast.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          )}
          <span className={toast.type === "success" ? "text-emerald-400" : "text-red-400"}>
            {toast.message}
          </span>
        </div>
      )}
    </div>
  );
}
