"""Create a clean source archive; never traverses symlinks or dependency folders."""
import argparse,json,zipfile
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--project',default='.');p.add_argument('--out',default='../cinematic-web-studio-v0.1.0.zip');a=p.parse_args()
root=Path(a.project).resolve();out=Path(a.out).resolve()
if root==out or root in out.parents: raise SystemExit('Archive must be outside the source directory')
deny={'.git','node_modules','test-results','dist','__pycache__','.pytest_cache','.venv'}
files=[]
for f in root.rglob('*'):
 rel=f.relative_to(root)
 if any(x in deny for x in rel.parts) or f.is_symlink() or not f.is_file():continue
 if any((root/Path(*rel.parts[:i])).is_symlink() for i in range(1,len(rel.parts))):continue
 if f.name.startswith('.env') and f.name!='.env.example':continue
 if f.suffix.lower() in {'.pem','.key','.p12','.pfx','.log','.zip'}:continue
 files.append((f,rel))
if not files:raise SystemExit('Nothing to package')
out.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for f,rel in files:z.write(f,root.name+'/'+rel.as_posix())
with zipfile.ZipFile(out) as z:
 assert z.testzip() is None
 manifests=[n for n in z.namelist() if n==root.name+'/plugin.json']
 if manifests:assert json.loads(z.read(manifests[0]))['name']=='cinematic-web-studio'
print(json.dumps({'archive':str(out),'files':len(files),'bytes':out.stat().st_size}))
