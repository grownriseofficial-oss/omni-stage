import { useState, useMemo } from "react";
import { Plus, DollarSign, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { crmStore } from "@/services/crmStore";
import { Deal, PipelineStage } from "@/types/crm";
import { format } from "date-fns";

export const DealsKanban = () => {
  const deals = crmStore.getDeals();
  const pipelines = crmStore.getPipelines();
  const defaultPipeline = pipelines[0]; // Use first pipeline for MVP
  
  const stageColumns = useMemo(() => {
    if (!defaultPipeline) return [];
    
    return defaultPipeline.stages.map(stage => ({
      ...stage,
      deals: deals.filter(deal => deal.stage_id === stage.id),
      totalValue: deals
        .filter(deal => deal.stage_id === stage.id)
        .reduce((sum, deal) => sum + deal.value, 0)
    }));
  }, [deals, defaultPipeline]);

  const handleDealMove = (dealId: string, newStageId: string) => {
    crmStore.updateDeal(dealId, { stage_id: newStageId });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!defaultPipeline) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pipeline configured</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pipeline: {defaultPipeline.name}</h2>
          <p className="text-muted-foreground">Manage your sales opportunities</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-x-auto min-h-[600px]">
        {stageColumns.map((stage) => (
          <div key={stage.id} className="min-w-[300px]">
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{stage.name}</h3>
                <Badge variant="secondary">{stage.deals.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                ${stage.totalValue.toLocaleString()}
              </p>
            </div>

            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <Card key={deal.id} className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground line-clamp-2">{deal.name}</h4>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                          <DollarSign className="w-3 h-3" />
                          {deal.value.toLocaleString()}
                        </div>
                        <Badge variant="outline">
                          {deal.probability}%
                        </Badge>
                      </div>

                      {deal.expected_close_date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(deal.expected_close_date), 'MMM dd')}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        Assigned
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="ghost" className="w-full h-12 border-2 border-dashed border-muted-foreground/25 text-muted-foreground hover:border-muted-foreground/50">
                <Plus className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};