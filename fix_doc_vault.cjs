const fs = require('fs');

// Fix DocumentStudio
let ds = fs.readFileSync('src/pages/DocumentStudio.tsx', 'utf8');
ds = ds.replace(/const \[loading, setLoading\] = React\.useState\(true\);/, `const [loading, setLoading] = React.useState(true);\n  const [error, setError] = React.useState<string | null>(null);`);
ds = ds.replace(/try \{[\s\S]*?\} catch \(e\) \{[\s\S]*?console\.error\(e\);[\s\S]*?\}/, `try {\n        setError(null);\n        const q = query(collection(db, 'documents'), where('organizationId', '==', currentOrgId));\n        const snap = await getDocs(q);\n        setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));\n      } catch (e) {\n        console.error("Error fetching documents:", e);\n        setError("No fue posible cargar la información.");\n      }`);
ds = ds.replace(/if \(loading\) return [\s\S]*?<\/div>;/, `if (loading) return <div className="flex items-center justify-center h-full"><div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-slate-500 font-medium">Cargando Documentos...</p></div></div>;\n\n  if (error) return <div className="p-8 text-center text-red-500 font-medium bg-red-50 rounded-lg border border-red-200 mt-6 mx-6">{error}</div>;`);
fs.writeFileSync('src/pages/DocumentStudio.tsx', ds);

// Fix EvidenceVault
let ev = fs.readFileSync('src/pages/EvidenceVault.tsx', 'utf8');
ev = ev.replace(/const \[loading, setLoading\] = React\.useState\(true\);/, `const [loading, setLoading] = React.useState(true);\n  const [error, setError] = React.useState<string | null>(null);`);
ev = ev.replace(/try \{[\s\S]*?\} catch \(e\) \{[\s\S]*?console\.error\(e\);[\s\S]*?\}/, `try {\n        setError(null);\n        const q = query(collection(db, 'evidences'), where('organizationId', '==', currentOrgId));\n        const snap = await getDocs(q);\n        setEvidences(snap.docs.map(d => ({ id: d.id, ...d.data() })));\n      } catch (e) {\n        console.error("Error fetching evidences:", e);\n        setError("No fue posible cargar la información.");\n      }`);
ev = ev.replace(/if \(loading\) return [\s\S]*?<\/div>;/, `if (loading) return <div className="flex items-center justify-center h-full"><div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-slate-500 font-medium">Cargando Evidencias...</p></div></div>;\n\n  if (error) return <div className="p-8 text-center text-red-500 font-medium bg-red-50 rounded-lg border border-red-200 mt-6 mx-6">{error}</div>;`);
fs.writeFileSync('src/pages/EvidenceVault.tsx', ev);

