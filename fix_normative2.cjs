const fs = require('fs');
let norm = fs.readFileSync('src/components/dashboard/NormativeStatus.tsx', 'utf8');

const badBlock = `{clauses.map(clause => (
                                    {(() => {
                    const info = getClauseImplementation(clause, std);
                    return (
                      <div
                        key={clause}
                        className={\`flex-1 h-8 \${info.color} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group\`}
                        onClick={() => setSelectedClause({ clause, std })}
                      >
                        <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded z-10 shadow-lg text-center">
                          <p className="font-bold">Cláusula {clause}</p>
                          <p>{info.text}</p>
                        </div>
                      </div>
                    );
                  })()}
                ))}`;

const goodBlock = `{clauses.map(clause => {
                  const info = getClauseImplementation(clause, std);
                  return (
                    <div
                      key={clause}
                      className={\`flex-1 h-8 \${info.color} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group\`}
                      onClick={() => setSelectedClause({ clause, std })}
                    >
                      <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded z-10 shadow-lg text-center">
                        <p className="font-bold">Cláusula {clause}</p>
                        <p>{info.text}</p>
                      </div>
                    </div>
                  );
                })}`;

norm = norm.replace(badBlock, goodBlock);
fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', norm);
