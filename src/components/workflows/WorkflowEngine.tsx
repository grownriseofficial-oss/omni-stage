import { useState, useEffect } from "react";
import { Play, Pause, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { crmStore } from "@/services/crmStore";
import { WorkflowTemplate } from "@/types/crm";
import { format } from "date-fns";

// Mock workflow execution type for demo
interface WorkflowExecution {
  id: string;
  workflow_id: string;
  status: 'running' | 'completed' | 'failed';
  started_at: string;
  completed_at?: string;
  logs: Array<{
    timestamp: string;
    level: 'info' | 'error';
    message: string;
  }>;
}

export const WorkflowEngine = () => {
  // Mock workflows for demo
  const mockWorkflows: WorkflowTemplate[] = [
    {
      id: '1',
      company_id: 'mock',
      name: 'Lead Welcome Sequence',
      description: 'Send welcome email to new leads',
      trigger: {
        event: 'lead.created',
        entity_type: 'lead',
        filters: { source: 'website' }
      },
      actions: [
        { type: 'send_email', config: { template: 'welcome' } },
        { type: 'create_task', config: { title: 'Follow up' } }
      ],
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'admin',
      updated_by: 'admin'
    }
  ];

  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>(mockWorkflows);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);

  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId ? { ...w, is_active: !w.is_active } : w
    ));
  };

  const handleTestWorkflow = (workflowId: string) => {
    // Simulate workflow execution
    const execution: WorkflowExecution = {
      id: `exec_${Date.now()}`,
      workflow_id: workflowId,
      status: 'running',
      started_at: new Date().toISOString(),
      logs: [
        { timestamp: new Date().toISOString(), level: 'info', message: 'Workflow execution started' },
        { timestamp: new Date().toISOString(), level: 'info', message: 'Evaluating trigger conditions' },
      ]
    };

    setExecutions(prev => [execution, ...prev]);

    // Simulate completion after 2 seconds
    setTimeout(() => {
      setExecutions(prev => prev.map(exec => 
        exec.id === execution.id 
          ? {
              ...exec,
              status: 'completed' as const,
              completed_at: new Date().toISOString(),
              logs: [
                ...exec.logs,
                { timestamp: new Date().toISOString(), level: 'info', message: 'Actions executed successfully' },
                { timestamp: new Date().toISOString(), level: 'info', message: 'Workflow execution completed' },
              ]
            }
          : exec
      ));
    }, 2000);
  };

  const getStatusIcon = (status: WorkflowExecution['status']) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: WorkflowExecution['status']) => {
    switch (status) {
      case 'running': return "bg-blue-100 text-blue-800";
      case 'completed': return "bg-green-100 text-green-800";
      case 'failed': return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Workflows</h2>
          <p className="text-muted-foreground">Automate your business processes</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Workflow
        </Button>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          {workflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={workflow.is_active ? "default" : "secondary"}>
                      {workflow.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleWorkflow(workflow.id)}
                    >
                      {workflow.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestWorkflow(workflow.id)}
                    >
                      Test
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Trigger</h4>
                    <p className="text-sm text-muted-foreground">
                      {workflow.trigger.event} {workflow.trigger.filters && `(filtered)`}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Actions ({workflow.actions.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {workflow.actions.map((action, index) => (
                        <Badge key={index} variant="outline">
                          {action.type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Created {format(new Date(workflow.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="executions" className="space-y-4">
          {executions.map((execution) => {
            const workflow = workflows.find(w => w.id === execution.workflow_id);
            return (
              <Card key={execution.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(execution.status)}
                        {workflow?.name || 'Unknown Workflow'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Started {format(new Date(execution.started_at), 'MMM dd, yyyy HH:mm:ss')}
                      </p>
                    </div>
                    <Badge className={getStatusColor(execution.status)}>
                      {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Execution Log</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {execution.logs.map((log, index) => (
                        <div key={index} className="text-xs font-mono bg-muted/50 p-2 rounded">
                          <span className="text-muted-foreground">
                            {format(new Date(log.timestamp), 'HH:mm:ss')}
                          </span>
                          <span className={`ml-2 ${log.level === 'error' ? 'text-red-600' : 'text-foreground'}`}>
                            [{log.level.toUpperCase()}] {log.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {executions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No workflow executions yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};