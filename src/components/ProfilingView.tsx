import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, Network, Shield, Server } from 'lucide-react';

// Datos de perfil normal
const normalProfile = [
  { hour: '00:00', connections: 45, bandwidth: 120 },
  { hour: '03:00', connections: 32, bandwidth: 95 },
  { hour: '06:00', connections: 58, bandwidth: 145 },
  { hour: '09:00', connections: 185, bandwidth: 520 },
  { hour: '12:00', connections: 220, bandwidth: 680 },
  { hour: '15:00', connections: 195, bandwidth: 590 },
  { hour: '18:00', connections: 140, bandwidth: 420 },
  { hour: '21:00', connections: 88, bandwidth: 280 },
];

// Comparación de comportamiento anómalo vs normal
const anomalyComparison = [
  { metric: 'Conexiones/min', normal: 12, anomalo: 156 },
  { metric: 'Ancho de Banda', normal: 250, anomalo: 1850 },
  { metric: 'Puertos Únicos', normal: 8, anomalo: 245 },
  { metric: 'Protocolos', normal: 4, anomalo: 18 },
  { metric: 'Paquetes/seg', normal: 450, anomalo: 3200 },
];

// Perfil de comportamiento por dispositivo
const deviceProfiles = [
  { name: 'Web Server', uptime: 99.8, traffic: 'Alto', risk: 'Bajo', anomalies: 3 },
  { name: 'DB Server', uptime: 99.9, traffic: 'Medio', risk: 'Bajo', anomalies: 1 },
  { name: 'File Server', uptime: 98.5, traffic: 'Medio', risk: 'Medio', anomalies: 8 },
  { name: 'Mail Server', uptime: 99.7, traffic: 'Alto', risk: 'Bajo', anomalies: 2 },
  { name: 'DMZ Gateway', uptime: 95.2, traffic: 'Muy Alto', risk: 'Alto', anomalies: 34 },
];

// Datos radar para análisis multidimensional
const radarData = [
  { metric: 'Volumen', normal: 80, actual: 95 },
  { metric: 'Frecuencia', normal: 75, actual: 88 },
  { metric: 'Diversidad', normal: 70, actual: 45 },
  { metric: 'Latencia', normal: 85, actual: 92 },
  { metric: 'Errores', normal: 95, actual: 78 },
];

// Evolución de la línea base
const baselineEvolution = [
  { date: 'Sem 1', baseline: 450, actual: 445 },
  { date: 'Sem 2', baseline: 452, actual: 458 },
  { date: 'Sem 3', baseline: 455, actual: 451 },
  { date: 'Sem 4', baseline: 458, actual: 462 },
  { date: 'Sem 5', baseline: 460, actual: 678 },
];

export function ProfilingView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Perfilado y Análisis de Comportamiento</h1>
        <p className="text-gray-600">Análisis del comportamiento normal de la red y detección de desviaciones</p>
      </div>

      {/* Resumen de estado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Perfiles Activos</CardTitle>
            <Activity className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">28</div>
            <p className="text-sm text-gray-600">Dispositivos monitoreados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Confianza del Perfil</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">94.2%</div>
            <p className="text-sm text-gray-600">Alta precisión</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Desviaciones Detectadas</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">48</div>
            <p className="text-sm text-gray-600">En las últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Última Actualización</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">5 min</div>
            <p className="text-sm text-gray-600">Perfil adaptativo</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="normal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="normal">Perfil Normal</TabsTrigger>
          <TabsTrigger value="anomaly">Análisis de Anomalías</TabsTrigger>
          <TabsTrigger value="devices">Perfiles por Dispositivo</TabsTrigger>
          <TabsTrigger value="network">Mapa de Red</TabsTrigger>
        </TabsList>

        <TabsContent value="normal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patrón de Tráfico Normal</CardTitle>
                <p className="text-sm text-gray-600">Comportamiento esperado por hora del día</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={normalProfile}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="connections" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Conexiones" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolución de la Línea Base</CardTitle>
                <p className="text-sm text-gray-600">Adaptación del perfil a lo largo del tiempo</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={baselineEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="baseline" stroke="#10b981" strokeWidth={2} name="Línea Base" />
                    <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Perfil Normal</CardTitle>
              <p className="text-sm text-gray-600">Valores establecidos por el motor de IA como comportamiento esperado</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Conexiones Promedio</p>
                  <p className="text-2xl text-gray-900 mb-1">145 /hora</p>
                  <p className="text-sm text-blue-600">±18 desviación estándar</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Ancho de Banda</p>
                  <p className="text-2xl text-gray-900 mb-1">380 Mbps</p>
                  <p className="text-sm text-green-600">±45 Mbps variación</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Protocolos Únicos</p>
                  <p className="text-2xl text-gray-900 mb-1">12</p>
                  <p className="text-sm text-purple-600">HTTP, HTTPS, DNS, SSH</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparación: Normal vs Anómalo</CardTitle>
                <p className="text-sm text-gray-600">Análisis de desviación del comportamiento detectado</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={anomalyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="normal" fill="#10b981" name="Normal" />
                    <Bar dataKey="anomalo" fill="#ef4444" name="Anómalo" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis Multidimensional</CardTitle>
                <p className="text-sm text-gray-600">Radar de comparación de métricas clave</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Normal" dataKey="normal" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Actual" dataKey="actual" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Drill-Down de Incidente: ALR-2025-001</CardTitle>
              <p className="text-sm text-gray-600">Comportamiento anómalo vs línea base del perfil</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">DoS Attack Detectado - 192.168.1.45</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Conexiones por minuto</p>
                        <p className="text-gray-900">Normal: 12 | Detectado: <span className="text-red-600">156 (+1200%)</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tasa de paquetes</p>
                        <p className="text-gray-900">Normal: 450 pps | Detectado: <span className="text-red-600">3200 pps (+611%)</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600">Diversidad de puertos</p>
                        <p className="text-gray-900">Normal: 8 | Detectado: <span className="text-red-600">245 (+2963%)</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600">Puntuación de anomalía</p>
                        <p className="text-red-600">95% - Alta confianza</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">Validación del Modelo</h4>
                    <p className="text-sm text-gray-600">
                      El motor de IA identificó correctamente este comportamiento como anómalo basándose en:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• Desviación extrema del perfil histórico (5.2σ)</li>
                      <li>• Patrón de tráfico inconsistente con horario esperado</li>
                      <li>• Correlación con firma de ataque conocida (DoS)</li>
                      <li>• Alta confianza en la clasificación (95%)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perfiles por Dispositivo</CardTitle>
              <p className="text-sm text-gray-600">Estado y comportamiento de dispositivos críticos</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceProfiles.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Network className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{device.name}</h4>
                        <div className="flex gap-4 text-sm">
                          <span className="text-gray-600">Uptime: <span className="text-gray-900">{device.uptime}%</span></span>
                          <span className="text-gray-600">Tráfico: <span className="text-gray-900">{device.traffic}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={device.risk === 'Alto' ? 'destructive' : device.risk === 'Medio' ? 'default' : 'outline'}
                        className={device.risk === 'Medio' ? 'bg-yellow-500' : ''}
                      >
                        Riesgo: {device.risk}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Anomalías</p>
                        <p className={`text-gray-900 ${device.anomalies > 10 ? 'text-red-600' : ''}`}>
                          {device.anomalies}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Red</CardTitle>
              <p className="text-sm text-gray-600">Visualización de dispositivos y zonas de anomalías</p>
            </CardHeader>
            <CardContent>
              <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
                {/* Internet */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <div className="text-center">
                      <Network className="w-8 h-8 mx-auto mb-1" />
                      <p className="text-sm">Internet</p>
                    </div>
                  </div>
                </div>

                {/* Firewall */}
                <div className="absolute top-48 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <div className="text-center">
                      <Shield className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs">Firewall</p>
                    </div>
                  </div>
                </div>

                {/* DMZ - Zona con anomalías */}
                <div className="absolute top-80 left-1/4 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-28 h-28 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-lg animate-pulse">
                      <div className="text-center">
                        <AlertTriangle className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs">DMZ Gateway</p>
                        <p className="text-xs">34 anomalías</p>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                      !
                    </div>
                  </div>
                </div>

                {/* Web Server */}
                <div className="absolute top-80 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-blue-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <div className="text-center">
                      <Server className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs">Web Server</p>
                    </div>
                  </div>
                </div>

                {/* DB Server */}
                <div className="absolute top-80 right-1/4">
                  <div className="w-24 h-24 bg-purple-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <div className="text-center">
                      <Activity className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs">DB Server</p>
                    </div>
                  </div>
                </div>

                {/* Conexiones */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="140" x2="50%" y2="192" stroke="#10b981" strokeWidth="3" />
                  <line x1="50%" y1="240" x2="25%" y2="320" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
                  <line x1="50%" y1="240" x2="50%" y2="320" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="50%" y1="240" x2="75%" y2="320" stroke="#a855f7" strokeWidth="3" />
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-600">Advertencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Crítico</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="text-sm text-gray-600">Monitorizado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
