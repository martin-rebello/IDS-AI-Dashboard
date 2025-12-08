import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Filter, Download, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface Alert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  sourceIp: string;
  destIp: string;
  port: number;
  protocol: string;
  anomalyScore: number;
  status: 'pending' | 'investigating' | 'false_positive' | 'resolved';
  dataTransferred: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'ALR-2025-001',
    timestamp: '2025-10-28 14:23:45',
    severity: 'critical',
    type: 'DoS Attack',
    sourceIp: '192.168.1.45',
    destIp: '10.0.0.12',
    port: 443,
    protocol: 'TCP',
    anomalyScore: 0.95,
    status: 'pending',
    dataTransferred: '2.3 GB'
  },
  {
    id: 'ALR-2025-002',
    timestamp: '2025-10-28 14:15:12',
    severity: 'high',
    type: 'Port Scan',
    sourceIp: '172.16.0.88',
    destIp: '10.0.0.15',
    port: 22,
    protocol: 'TCP',
    anomalyScore: 0.87,
    status: 'investigating',
    dataTransferred: '124 KB'
  },
  {
    id: 'ALR-2025-003',
    timestamp: '2025-10-28 14:08:33',
    severity: 'critical',
    type: 'Brute Force',
    sourceIp: '203.45.12.67',
    destIp: '10.0.0.8',
    port: 3389,
    protocol: 'RDP',
    anomalyScore: 0.92,
    status: 'investigating',
    dataTransferred: '45 MB'
  },
  {
    id: 'ALR-2025-004',
    timestamp: '2025-10-28 13:56:21',
    severity: 'medium',
    type: 'SQL Injection',
    sourceIp: '192.168.1.102',
    destIp: '10.0.0.20',
    port: 3306,
    protocol: 'MySQL',
    anomalyScore: 0.76,
    status: 'resolved',
    dataTransferred: '3.2 MB'
  },
  {
    id: 'ALR-2025-005',
    timestamp: '2025-10-28 13:42:18',
    severity: 'high',
    type: 'Data Exfiltration',
    sourceIp: '10.0.0.45',
    destIp: '185.220.101.5',
    port: 8080,
    protocol: 'HTTP',
    anomalyScore: 0.89,
    status: 'pending',
    dataTransferred: '567 MB'
  },
  {
    id: 'ALR-2025-006',
    timestamp: '2025-10-28 13:31:07',
    severity: 'low',
    type: 'Anomalía de Protocolo',
    sourceIp: '192.168.1.78',
    destIp: '10.0.0.5',
    port: 53,
    protocol: 'DNS',
    anomalyScore: 0.62,
    status: 'false_positive',
    dataTransferred: '8 KB'
  },
  {
    id: 'ALR-2025-007',
    timestamp: '2025-10-28 13:18:55',
    severity: 'medium',
    type: 'Acceso No Autorizado',
    sourceIp: '172.16.0.123',
    destIp: '10.0.0.3',
    port: 445,
    protocol: 'SMB',
    anomalyScore: 0.74,
    status: 'resolved',
    dataTransferred: '156 MB'
  },
  {
    id: 'ALR-2025-008',
    timestamp: '2025-10-28 12:58:42',
    severity: 'high',
    type: 'DoS Attack',
    sourceIp: '198.51.100.42',
    destIp: '10.0.0.12',
    port: 80,
    protocol: 'HTTP',
    anomalyScore: 0.88,
    status: 'investigating',
    dataTransferred: '1.8 GB'
  }
];

export function AlertsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = searchTerm === '' || 
      alert.sourceIp.includes(searchTerm) || 
      alert.destIp.includes(searchTerm) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: 'destructive',
      high: 'default',
      medium: 'secondary',
      low: 'outline'
    };
    const colors = {
      critical: '',
      high: 'bg-orange-500 hover:bg-orange-600',
      medium: 'bg-yellow-500 hover:bg-yellow-600',
      low: ''
    };
    
    return (
      <Badge variant={variants[severity as keyof typeof variants] as any} className={colors[severity as keyof typeof colors]}>
        {severity === 'critical' ? 'Crítica' : severity === 'high' ? 'Alta' : severity === 'medium' ? 'Media' : 'Baja'}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const labels = {
      pending: 'Pendiente',
      investigating: 'En Investigación',
      false_positive: 'Falso Positivo',
      resolved: 'Resuelto'
    };
    const colors = {
      pending: 'bg-blue-100 text-blue-800',
      investigating: 'bg-purple-100 text-purple-800',
      false_positive: 'bg-gray-100 text-gray-800',
      resolved: 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Gestión de Alertas</h1>
        <p className="text-gray-600">Monitoreo y gestión de incidentes de seguridad</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por IP, tipo de ataque o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las severidades</SelectItem>
                <SelectItem value="critical">Crítica</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="investigating">En Investigación</SelectItem>
                <SelectItem value="false_positive">Falso Positivo</SelectItem>
                <SelectItem value="resolved">Resuelto</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertas en Vivo ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Severidad</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>IP Origen</TableHead>
                  <TableHead>IP Destino</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="text-gray-900">{alert.id}</TableCell>
                    <TableCell className="text-gray-600">{alert.timestamp}</TableCell>
                    <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                    <TableCell className="text-gray-900">{alert.type}</TableCell>
                    <TableCell className="text-gray-900">{alert.sourceIp}</TableCell>
                    <TableCell className="text-gray-900">{alert.destIp}</TableCell>
                    <TableCell>
                      <span className={`${alert.anomalyScore >= 0.9 ? 'text-red-600' : alert.anomalyScore >= 0.75 ? 'text-orange-600' : 'text-yellow-600'}`}>
                        {(alert.anomalyScore * 100).toFixed(0)}%
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedAlert(alert)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalle de Alerta: {alert.id}</DialogTitle>
                            <DialogDescription>
                              Información completa del incidente detectado
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Timestamp</p>
                                <p className="text-gray-900">{alert.timestamp}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Severidad</p>
                                {getSeverityBadge(alert.severity)}
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Tipo de Ataque</p>
                                <p className="text-gray-900">{alert.type}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Puntuación de Anomalía</p>
                                <p className="text-gray-900">{(alert.anomalyScore * 100).toFixed(1)}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">IP Origen</p>
                                <p className="text-gray-900">{alert.sourceIp}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">IP Destino</p>
                                <p className="text-gray-900">{alert.destIp}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Puerto</p>
                                <p className="text-gray-900">{alert.port}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Protocolo</p>
                                <p className="text-gray-900">{alert.protocol}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Datos Transferidos</p>
                                <p className="text-gray-900">{alert.dataTransferred}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Estado</p>
                                {getStatusBadge(alert.status)}
                              </div>
                            </div>
                            <div className="pt-4 border-t">
                              <p className="text-sm text-gray-600 mb-2">Cambiar Estado del Incidente</p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Pendiente</Button>
                                <Button size="sm" variant="outline">En Investigación</Button>
                                <Button size="sm" variant="outline">Falso Positivo</Button>
                                <Button size="sm" variant="default">Resuelto</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
