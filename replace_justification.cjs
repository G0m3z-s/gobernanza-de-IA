const fs = require('fs');
let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

const regex = /<option value="not_applicable">No aplica<\/option>[\s\S]*?<\/select>[\s\S]*?<\/div>/;

const replacement = `<option value="not_applicable">No aplica</option>
                </select>
              </div>

              {status === 'not_applicable' && (
                <div className="col-span-2 mt-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Justificación (Requerida)</label>
                  <textarea
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Indique por qué este control no es aplicable..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[80px]"
                    required
                  />
                </div>
              )}`;

if (regex.test(content)) {
  fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content.replace(regex, replacement));
  console.log("Success regex");
} else {
  console.log("Failed");
}
