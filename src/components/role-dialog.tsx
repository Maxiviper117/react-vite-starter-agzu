import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { RoleEntry } from "@/lib/schemas/hiring-request";

const softwareToolOptions = [
  "Excel",
  "CAD",
  "QuickBooks",
  "Zoho",
  "Other",
] as const;

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

  useEffect(() => {
    if (open) {
      setRole(initialRole ? { ...initialRole } : { ...defaultRole });
      setShowError(false);
    }
  }, [open, initialRole]);

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
            <Label htmlFor="draft-requiredSoftwareTools">
              Required Software & Tools
            </Label>
            <Select
              value={role.requiredSoftwareTools}
              onValueChange={(v) =>
                setRole((r) => ({ ...r, requiredSoftwareTools: v }))
              }
            >
              <SelectTrigger
                id="draft-requiredSoftwareTools"
                className="w-full"
              >
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                {softwareToolOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="draft-otherRequiredSoftwareTools">
              Other Required Software & Tools
            </Label>
            <Textarea
              id="draft-otherRequiredSoftwareTools"
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
