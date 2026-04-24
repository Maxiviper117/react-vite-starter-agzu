import { useState } from "react";
import { Pencil, Plus, SendHorizonal, Trash2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import type { StandardSchemaV1Issue } from "@tanstack/form-core";

import reworksLogo from "@/assets/Reworks-Logo.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  type HiringRequestFormInput,
  type RoleEntry,
  hiringRequestSchema,
} from "@/lib/schemas/hiring-request";

const softwareToolOptions = ["Excel", "CAD", "QuickBooks", "Zoho", "Other"] as const;

const defaultRole: RoleEntry = {
  jobTitle: "",
  requiredSoftwareTools: "",
  otherRequiredSoftwareTools: "",
  hoursOfOperation: "",
  jobExperienceRequirements: "",
  numberOfEmployeesNeeded: 1,
};

function numberOfEmployeesLabel(count: number) {
  return count === 1 ? "1 role required" : `${count} roles required`;
}

function App() {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [draftRole, setDraftRole] = useState<RoleEntry>(defaultRole);

  const form = useForm({
    defaultValues: {
      businessName: "",
      businessWebsite: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      secondaryEmail: "",
      roles: [defaultRole],
      traits: "",
      outsourced: "",
      additionalDetails: "",
    } as HiringRequestFormInput,
    validators: {
      onChange: hiringRequestSchema,
    },
    onSubmit: ({ value }) => {
      setSubmissionMessage(
        `Validated locally with Zod. ${value.roles.length} role request${value.roles.length === 1 ? "" : "s"} ready to submit.`,
      );

      console.info("Validated hiring request payload:", value);
    },
  });

  const renderFieldError = (errors: unknown[]) => {
    const messages = errors
      .map((e) =>
        typeof e === "string"
          ? e
          : (e as StandardSchemaV1Issue | undefined)?.message,
      )
      .filter(Boolean) as string[];
    return messages.length > 0 ? (
      <p className="text-sm text-destructive">{messages.join(", ")}</p>
    ) : null;
  };

  const openNewRole = () => {
    setDraftRole({ ...defaultRole });
    setEditingIndex(-1);
    setDialogOpen(true);
  };

  const openEditRole = (index: number, role: RoleEntry) => {
    setDraftRole({ ...role });
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const handleSaveRole = (pushValue: (value: RoleEntry) => void) => {
    if (editingIndex === -1) {
      pushValue(draftRole);
    } else {
      form.setFieldValue(`roles[${editingIndex}]`, draftRole);
    }
    setDialogOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#cad3f0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 ">
        <div className="flex justify-center">
          <img
            src={reworksLogo}
            alt="Reworks Solutions"
            className="h-auto w-64 sm:w-80"
          />
        </div>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Card className="shadow-sm p-4">
            <CardHeader className="border-b border-border/60 pb-6 ">
              <CardTitle>Business and contact details</CardTitle>
              <CardDescription>
                Tell us who you are and how we should follow up.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <section className="grid gap-5 sm:grid-cols-2">
                <form.Field name="businessName">
                  {(field) => (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="businessName">
                        Business Name{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>

                <form.Field name="businessWebsite">
                  {(field) => (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="businessWebsite" className="text-lg">Business Website</Label>
                      <Input
                        id="businessWebsite"
                        name={field.name}
                        placeholder="https://"
                        type="url"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>

                <form.Field name="firstName">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>

                <form.Field name="lastName">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>

                <form.Field name="phone">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name={field.name}
                        type="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>

                <form.Field name="secondaryEmail">
                  {(field) => (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="secondaryEmail">Secondary Email</Label>
                      <Input
                        id="secondaryEmail"
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                      {renderFieldError(field.state.meta.errors)}
                    </div>
                  )}
                </form.Field>
              </section>
            </CardContent>
          </Card>

          <Card className="shadow-sm p-4">
            <CardHeader className="border-b border-border/60 pb-6">
              <CardTitle>Job details</CardTitle>
              <CardDescription>
                Provide the role details and anything else that would help us
                understand the hire.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 pt-6">
              <form.Field name="traits">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="traits">
                      Are there specific personality traits or characteristics
                      you prefer in a candidate?
                    </Label>
                    <Textarea
                      id="traits"
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    {renderFieldError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              <form.Field name="outsourced">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="outsourced">
                      Have you outsourced in the past? If so, what worked or
                      didn't work for you?
                    </Label>
                    <Textarea
                      id="outsourced"
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    {renderFieldError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              <form.Field name="additionalDetails">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="additionalDetails">
                      Are there any additional details or requirements you'd
                      like to share?
                    </Label>
                    <Textarea
                      id="additionalDetails"
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    {renderFieldError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          <Card className="shadow-sm p-4">
            <CardHeader className="border-b border-border/60 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>Roles</CardTitle>
                  <CardDescription>
                    Add the roles you want to fill.
                  </CardDescription>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openNewRole}
                >
                  <Plus />
                  Add role
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form.Field name="roles" mode="array">
                {(field) => {
                  const roles = field.state.value;
                  const roleErrorMessage =
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors.join(", ")
                      : null;

                  return (
                    <div className="space-y-3">
                      {roleErrorMessage ? (
                        <p className="text-sm text-destructive">
                          {roleErrorMessage}
                        </p>
                      ) : null}

                      {roles.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No roles added yet. Click "Add role" to get started.
                        </p>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {roles.map((role, index) => {
                            const r = role as RoleEntry;
                            return (
                              <div
                                key={index}
                                className="flex flex-col gap-3 rounded-lg border border-border/60 bg-background p-4"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="text-sm font-semibold text-foreground">
                                    {r.jobTitle || `Role ${index + 1}`}
                                  </h3>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => openEditRole(index, r)}
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                      aria-label={`Remove role ${index + 1}`}
                                      disabled={roles.length === 1}
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => field.removeValue(index)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                  {numberOfEmployeesLabel(
                                    r.numberOfEmployeesNeeded ?? 1,
                                  )}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>
                              {editingIndex === -1 ? "Add Role" : "Edit Role"}
                            </DialogTitle>
                            <DialogDescription>
                              Fill out the job details for this role.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-2">
                            <div className="space-y-2">
                              <Label htmlFor="draft-jobTitle">Job Title</Label>
                              <Input
                                id="draft-jobTitle"
                                value={draftRole.jobTitle}
                                onChange={(e) =>
                                  setDraftRole((r) => ({
                                    ...r,
                                    jobTitle: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="draft-requiredSoftwareTools">
                                Required Software & Tools
                              </Label>
                              <Select
                                value={draftRole.requiredSoftwareTools}
                                onValueChange={(v) =>
                                  setDraftRole((r) => ({
                                    ...r,
                                    requiredSoftwareTools: v,
                                  }))
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
                                value={draftRole.otherRequiredSoftwareTools}
                                onChange={(e) =>
                                  setDraftRole((r) => ({
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
                                value={draftRole.hoursOfOperation}
                                onChange={(e) =>
                                  setDraftRole((r) => ({
                                    ...r,
                                    hoursOfOperation: e.target.value,
                                  }))
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
                                value={draftRole.jobExperienceRequirements}
                                onChange={(e) =>
                                  setDraftRole((r) => ({
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
                                value={draftRole.numberOfEmployeesNeeded}
                                onChange={(e) =>
                                  setDraftRole((r) => ({
                                    ...r,
                                    numberOfEmployeesNeeded:
                                      e.target.value === ""
                                        ? 1
                                        : e.target.valueAsNumber,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleSaveRole(field.pushValue)}
                            >
                              Save role
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center gap-3 border-t border-border/60 pt-6">
            {submissionMessage ? (
              <p className="text-sm text-emerald-600">{submissionMessage}</p>
            ) : null}

            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button
                  className="w-full max-w-xs py-6 text-lg"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <SendHorizonal />
                  Submit Request
                </Button>
              )}
            </form.Subscribe>

            <p className="text-sm text-muted-foreground">
              Fields marked with an asterisk are required.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
