import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Server, Brain, Users, Play, Pause, RefreshCw, Settings2, Database, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const sensors = [
  { id: 'SEN-001', name: 'Gateway Principal', location: 'Core Network', status: 'active', latency: 12, packets: 1250000 },
  { id: 'SEN-002', name: 'DMZ Sensor', location: 'DMZ', status: 'active', latency: 8, packets: 850000 },
  { id: 'SEN-003', name: 'Web Farm Monitor', location: 'Web Tier', status: 'active', latency: 15, packets: 2100000 },
  { id: 'SEN-004', name: 'Database Sniffer', location: 'Data Tier', status: 'active', latency: 10, packets: 680000 },
  { id: 'SEN-005', name: 'Remote Office', location: 'Branch Office', status: 'warning', latency: 45, packets: 120000 },
];

const users = [
  { id: 'USR-001', name: 'Juan Pérez', email: 'juan.perez@ids.com', role: 'Administrador', lastLogin: '2025-10-28 14:23' },
  { id: 'USR-002', name: 'María García', email: 'maria.garcia@ids.com', role: 'Analista Senior', lastLogin: '2025-10-28 13:45' },
  { id: 'USR-003', name: 'Carlos López', email: 'carlos.lopez@ids.com', role: 'Analista', lastLogin: '2025-10-28 12:30' },
  { id: 'USR-004', name: 'Ana Martínez', email: 'ana.martinez@ids.com', role: 'Analista', lastLogin: '2025-10-27 18:15' },
];

export function ConfigView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Configuración y Administración</h1>
        <p className="text-gray-600">Gestión de sensores, motor de IA y permisos de usuario</p>
      </div>

      <Tabs defaultValue="sensors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sensors">Sensores</TabsTrigger>
          <TabsTrigger value="ai">Motor de IA</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="sensors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Total Sensores</CardTitle>
                <Server className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">25</div>
                <p className="text-sm text-gray-600">24 activos, 1 inactivo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Paquetes Procesados</CardTitle>
                <Database className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">5.8M</div>
                <p className="text-sm text-gray-600">Última hora</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Latencia Promedio</CardTitle>
                <Settings2 className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">18ms</div>
                <p className="text-sm text-gray-600">Dentro del rango óptimo</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Sensores</CardTitle>
                <p className="text-sm text-gray-600">Monitoreo y control de agentes de recolección</p>
              </div>
              <Button>
                <Server className="w-4 h-4 mr-2" />
                Agregar Sensor
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Latencia</TableHead>
                    <TableHead>Paquetes/h</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensors.map((sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell className="text-gray-900">{sensor.id}</TableCell>
                      <TableCell className="text-gray-900">{sensor.name}</TableCell>
                      <TableCell className="text-gray-600">{sensor.location}</TableCell>
                      <TableCell>
                        <Badge variant={sensor.status === 'active' ? 'default' : 'outline'} className={sensor.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {sensor.status === 'active' ? 'Activo' : 'Advertencia'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">{sensor.latency}ms</TableCell>
                      <TableCell className="text-gray-900">{(sensor.packets / 1000).toFixed(0)}K</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Pause className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Estado del Motor</CardTitle>
                <Brain className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">Activo</div>
                <p className="text-sm text-gray-600">Modelo v2.4.1</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Precisión Actual</CardTitle>
                <Shield className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">96.8%</div>
                <p className="text-sm text-gray-600">Último entrenamiento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Muestras Entrenamiento</CardTitle>
                <Database className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">2.4M</div>
                <p className="text-sm text-gray-600">Eventos procesados</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuración del Motor de IA</CardTitle>
              <p className="text-sm text-gray-600">Ajustes de detección y aprendizaje adaptativo</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Algoritmo de Detección</Label>
                  <Select defaultValue="ensemble">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ensemble">Ensemble (Isolation Forest + LSTM)</SelectItem>
                      <SelectItem value="isolation">Isolation Forest</SelectItem>
                      <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                      <SelectItem value="kmeans">k-Means Clustering</SelectItem>
                      <SelectItem value="autoencoder">Autoencoder</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">Modelo actual: Ensemble proporciona mejor balance precisión/velocidad</p>
                </div>

                <div>
                  <Label>Umbral de Detección de Anomalías</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider defaultValue={[75]} max={100} step={1} className="flex-1" />
                    <span className="text-gray-900 w-12">75%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Menor umbral = más sensible (más alertas, más falsos positivos)</p>
                </div>

                <div>
                  <Label>Sensibilidad de Falsos Positivos</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider defaultValue={[60]} max={100} step={1} className="flex-1" />
                    <span className="text-gray-900 w-12">60%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Balance entre detección y reducción de FPR</p>
                </div>

                <div>
                  <Label>Ventana de Tiempo para Análisis</Label>
                  <Select defaultValue="5min">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1min">1 minuto (Tiempo real)</SelectItem>
                      <SelectItem value="5min">5 minutos (Recomendado)</SelectItem>
                      <SelectItem value="15min">15 minutos</SelectItem>
                      <SelectItem value="30min">30 minutos</SelectItem>
                      <SelectItem value="1hour">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Aprendizaje Continuo</p>
                    <p className="text-sm text-gray-600">Reentrenar modelo automáticamente con nuevos datos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Feedback Loop Automático</p>
                    <p className="text-sm text-gray-600">Usar clasificación de analistas para mejorar el modelo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-4">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reentrenar Modelo
                  </Button>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Exportar Configuración
                  </Button>
                  <Button>
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Entrenamientos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="text-gray-900">v2.4.1 - Modelo Actual</p>
                    <p className="text-sm text-gray-600">2025-10-25 08:30 - 2.4M muestras - Precisión: 96.8%</p>
                  </div>
                  <Badge className="bg-green-500">Activo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">v2.4.0</p>
                    <p className="text-sm text-gray-600">2025-10-18 10:15 - 2.1M muestras - Precisión: 95.2%</p>
                  </div>
                  <Button variant="ghost" size="sm">Revertir</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">v2.3.8</p>
                    <p className="text-sm text-gray-600">2025-10-11 14:45 - 1.9M muestras - Precisión: 94.8%</p>
                  </div>
                  <Button variant="ghost" size="sm">Revertir</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Usuarios y Roles</CardTitle>
                <p className="text-sm text-gray-600">Control de acceso y permisos del sistema</p>
              </div>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Agregar Usuario
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-gray-900">{user.id}</TableCell>
                      <TableCell className="text-gray-900">{user.name}</TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Administrador' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm">Eliminar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Roles y Permisos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Administrador</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Acceso completo al sistema</li>
                    <li>✓ Gestión de usuarios y sensores</li>
                    <li>✓ Configuración del motor de IA</li>
                    <li>✓ Gestión de alertas y perfiles</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Analista Senior</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Gestión completa de alertas</li>
                    <li>✓ Acceso a perfilado y análisis</li>
                    <li>✓ Configuración de umbrales</li>
                    <li>✗ Gestión de usuarios</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Analista</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Visualización de dashboard</li>
                    <li>✓ Gestión básica de alertas</li>
                    <li>✓ Acceso a perfilado (solo lectura)</li>
                    <li>✗ Modificación de configuración</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-gray-900">Juan Pérez modificó umbral de detección</p>
                      <p className="text-gray-600 text-xs">Hace 15 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-gray-900">María García cerró 12 alertas</p>
                      <p className="text-gray-600 text-xs">Hace 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-gray-900">Sistema inició reentrenamiento del modelo</p>
                      <p className="text-gray-600 text-xs">Hace 3 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-gray-900">Carlos López agregó nuevo sensor</p>
                      <p className="text-gray-600 text-xs">Hace 5 horas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Nombre del Sistema</Label>
                  <Input defaultValue="IDS-IA Production v2.4" className="mt-1" />
                </div>

                <div>
                  <Label>Zona Horaria</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                      <SelectItem value="utc-6">UTC-6 (CST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Retención de Datos</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="180">180 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Notificaciones por Email</p>
                    <p className="text-sm text-gray-600">Enviar alertas críticas por correo</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Modo Mantenimiento</p>
                    <p className="text-sm text-gray-600">Pausar detección durante actualizaciones</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button>Guardar Configuración</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Versión</span>
                  <span className="text-gray-900">2.4.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Última Actualización</span>
                  <span className="text-gray-900">2025-10-25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime del Sistema</span>
                  <span className="text-gray-900">45 días 12h 34m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Base de Datos</span>
                  <span className="text-gray-900">PostgreSQL 15.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Espacio Utilizado</span>
                  <span className="text-gray-900">234 GB / 500 GB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones de Mantenimiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Database className="w-4 h-4 mr-2" />
                  Backup de Base de Datos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reiniciar Sensores
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Limpiar Logs Antiguos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Verificar Integridad
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
