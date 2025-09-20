import { useState, useMemo } from "react";
import { Plus, DollarSign, Calendar, User, MoreVertical, TrendingUp, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { crmStore } from "@/services/crmStore";
import { Deal, PipelineStage } from "@/types/crm";
import { format, isAfter, isBefore, addDays } from "date-fns";

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


  if (!defaultPipeline) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pipeline configured</p>
        </div>
      </div>
    );
  }

  const pipelineStats = useMemo(() => {
    const totalDeals = deals.length;
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    const avgDealSize = totalDeals > 0 ? totalValue / totalDeals : 0;
    const avgWinRate = stageColumns.length > 0 
      ? stageColumns.find(s => s.name.toLowerCase().includes('won'))?.deals.length || 0 / totalDeals * 100 
      : 0;
    
    return { totalDeals, totalValue, avgDealSize, avgWinRate };
  }, [deals, stageColumns]);

  const getDealPriority = (deal: Deal) => {
    if (!deal.expected_close_date) return 'medium';
    const daysUntilClose = Math.ceil((new Date(deal.expected_close_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilClose <= 7) return 'high';
    if (daysUntilClose <= 30) return 'medium';
    return 'low';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline: {defaultPipeline.name}</h1>
          <p className="text-muted-foreground mt-1">Manage your sales opportunities and track progress</p>
        </div>
        <Button className="bg-gradient-primary hover-scale shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deals</p>
                <p className="text-2xl font-bold">{pipelineStats.totalDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">${(pipelineStats.totalValue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-2xl font-bold">${(pipelineStats.avgDealSize / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">{pipelineStats.avgWinRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 min-h-[600px]">
        {stageColumns.map((stage, stageIndex) => (
          <div key={stage.id} className="min-w-[320px] flex-shrink-0 animate-fade-in" style={{animationDelay: `${stageIndex * 0.1}s`}}>
            <div className="bg-gradient-subtle rounded-xl p-5 mb-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-lg">{stage.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-semibold">
                    {stage.deals.length}
                  </Badge>
                  <Badge variant="outline" className="font-mono text-xs">
                    ${(stage.totalValue / 1000).toFixed(0)}K
                  </Badge>
                </div>
              </div>
              <Progress 
                value={(stage.deals.length / Math.max(deals.length, 1)) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {((stage.deals.length / Math.max(deals.length, 1)) * 100).toFixed(1)}% of pipeline
              </p>
            </div>

            <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
              {stage.deals.map((deal, dealIndex) => {
                const priority = getDealPriority(deal);
                const isOverdue = deal.expected_close_date && isBefore(new Date(deal.expected_close_date), new Date());
                
                return (
                  <Card key={deal.id} className="cursor-pointer transition-all hover:shadow-elegant hover-scale group animate-fade-in" style={{animationDelay: `${(stageIndex * 0.1) + (dealIndex * 0.05)}s`}}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {deal.name}
                          </h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                              <DropdownMenuItem>Move to Stage</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                            <DollarSign className="w-4 h-4 text-success" />
                            ${deal.value.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-semibold">
                              {deal.probability}%
                            </Badge>
                            <Badge className={getPriorityColor(priority)} variant="secondary">
                              {priority}
                            </Badge>
                          </div>
                        </div>

                        {deal.expected_close_date && (
                          <div className={`flex items-center gap-2 text-sm ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
                            <Calendar className="w-4 h-4" />
                            <span className={isOverdue ? 'font-semibold' : ''}>
                              {isOverdue ? 'Overdue: ' : 'Due: '}
                              {format(new Date(deal.expected_close_date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>Sales Rep</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: {deal.id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Button 
                variant="ghost" 
                className="w-full h-16 border-2 border-dashed border-muted-foreground/25 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all group"
              >
                <div className="text-center">
                  <Plus className="w-5 h-5 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Add Deal</span>
                </div>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};