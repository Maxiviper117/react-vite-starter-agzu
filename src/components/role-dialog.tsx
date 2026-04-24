import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { RoleEntry } from "@/lib/schemas/hiring-request";

const softwareToolOptions = [
  "Excel",
  "CAD",
  "QuickBooks",
  "Zoho",
  "Other",
] as const;

function parseSoftwareTools(value: string | null | undefined) {
  return (value ?? "")
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);
}

function serializeSoftwareTools(values: string[]) {
  return values.join(", ");
}

const defaultRole: RoleEntry = {
  jobTitle: "",
  requiredSoftwareTools: "",
  otherRequiredSoftwareTools: "",
  hoursOfOperation: "",
  jobExperienceRequirements: "",
  numberOfEmployeesNeeded: 1,
};

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRole?: RoleEntry;
  isEditing: boolean;
  onSave: (role: RoleEntry) => void;
}

export function RoleDialog({
  open,
  onOpenChange,
  initialRole,
  isEditing,
  onSave,
}: RoleDialogProps) {
  const [role, setRole] = useState<RoleEntry>(defaultRole);
  const [showError, setShowError] = useState(false);
  const [softwareToolsOpen, setSoftwareToolsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setRole(initialRole ? { ...initialRole } : { ...defaultRole });
      setShowError(false);
      setSoftwareToolsOpen(false);
    }
  }, [open, initialRole]);

  const toggleSoftwareTool = (tool: string) => {
    setRole((current) => ({
      ...current,
      requiredSoftwareTools: (() => {
        const currentTools = parseSoftwareTools(current.requiredSoftwareTools);

        return currentTools.includes(tool)
          ? serializeSoftwareTools(
              currentTools.filter((selected) => selected !== tool),
            )
          : serializeSoftwareTools([...currentTools, tool]);
      })(),
    }));
  };

  const selectedSoftwareTools = parseSoftwareTools(role.requiredSoftwareTools);

  const handleSave = () => {
    if (!role.jobTitle.trim()) {
      setShowError(true);
      return;
    }
    onSave(role);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
          <DialogDescription>
            Fill out the job details for this role.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="draft-jobTitle">
              Job Title
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="draft-jobTitle"
              className="bg-gray-100/50"
              value={role.jobTitle}
              onChange={(e) =>
                setRole((r) => ({ ...r, jobTitle: e.target.value }))
              }
              aria-invalid={showError && !role.jobTitle.trim()}
            />
            {showError && !role.jobTitle.trim() && (
              <p className="text-sm text-destructive">Job title is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Required Software & Tools
            </Label>
            {selectedSoftwareTools.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSoftwareTools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            ) : null}

            <Popover open={softwareToolsOpen} onOpenChange={setSoftwareToolsOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span className="truncate text-left">
                    {selectedSoftwareTools.length > 0
                      ? `${selectedSoftwareTools.length} tool${selectedSoftwareTools.length === 1 ? "" : "s"} selected`
                      : "Search and select tools"}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search software tools..." />
                  <CommandList>
                    <CommandEmpty>No tools found.</CommandEmpty>
                    <CommandGroup>
                      {softwareToolOptions.map((option) => {
                        const selected = selectedSoftwareTools.includes(option);

                        return (
                          <CommandItem
                            key={option}
                            value={option}
                            data-checked={selected}
                            onSelect={() => toggleSoftwareTool(option)}
                          >
                            {option}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="draft-otherRequiredSoftwareTools">
              Other Required Software & Tools
            </Label>
            <Textarea
              id="draft-otherRequiredSoftwareTools"
              className="bg-gray-100/50"
              rows={3}
              placeholder="Please add Required Software & Tools here in comma separated list if field above does not include desired options."
              value={role.otherRequiredSoftwareTools}
              onChange={(e) =>
                setRole((r) => ({
                  ...r,
                  otherRequiredSoftwareTools: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="draft-hoursOfOperation">
              Hours of Operation (EST)
            </Label>
            <Input
              id="draft-hoursOfOperation"
              className="bg-gray-100/50"
              placeholder="(e.g., Mon to Friday 9am - 5pm EST)"
              value={role.hoursOfOperation}
              onChange={(e) =>
                setRole((r) => ({ ...r, hoursOfOperation: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="draft-jobExperienceRequirements">
              Job Experience Requirements
            </Label>
            <Input
              id="draft-jobExperienceRequirements"
              className="bg-gray-100/50"
              placeholder="(e.g., experience in customer service, bookkeeping, e-commerce)"
              value={role.jobExperienceRequirements}
              onChange={(e) =>
                setRole((r) => ({
                  ...r,
                  jobExperienceRequirements: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="draft-numberOfEmployeesNeeded">
              Number of Employees Needed
            </Label>
            <Input
              id="draft-numberOfEmployeesNeeded"
              className="bg-gray-100/50"
              min={1}
              step={1}
              type="number"
              value={role.numberOfEmployeesNeeded}
              onChange={(e) =>
                setRole((r) => ({
                  ...r,
                  numberOfEmployeesNeeded:
                    e.target.value === "" ? 1 : e.target.valueAsNumber,
                }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
