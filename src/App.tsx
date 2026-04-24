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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RoleDialog } from "@/components/role-dialog";
import {
  type HiringRequestFormInput,
  type RoleEntry,
  hiringRequestSchema,
} from "@/lib/schemas/hiring-request";

function numberOfEmployeesLabel(count: number) {
  return count === 1 ? "1 role required" : `${count} roles required`;
}

function App() {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null,
  );
  const [editingRole, setEditingRole] = useState<
    { index: number; role: RoleEntry } | { index: -1; role?: undefined } | null
  >(null);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {},
  );
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      businessName: "",
      businessWebsite: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      secondaryEmail: "",
      roles: [],
      traits: "",
      outsourced: "",
      additionalDetails: "",
    } as HiringRequestFormInput,
    validators: {
      onChange: hiringRequestSchema,
    },
    onSubmit: ({ value }) => {
      setServerErrors({});
      setSuccess(false);

      console.info("Validated hiring request payload:", value);

      // TODO submit the validated payload to the server or an API route here. You can use fetch.

      setSuccess(true);
      setSubmissionMessage(
        `${value.roles.length} role request${value.roles.length === 1 ? "" : "s"} ready to submit.`,
      );
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
    setEditingRole({ index: -1 });
  };

  const openEditRole = (index: number, role: RoleEntry) => {
    setEditingRole({ index, role });
  };

  const handleSaveRole = (
    role: RoleEntry,
    pushValue: (value: RoleEntry) => void,
  ) => {
    if (!editingRole) return;
    if (editingRole.index === -1) {
      pushValue(role);
    } else {
      form.setFieldValue(`roles[${editingRole.index}]`, role);
    }
    setEditingRole(null);
  };

  return (
    <main className="min-h-screen bg-[#cad3f0]/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 ">
        <div className="flex-col justify-center items-center space-y-6 rounded-lg bg-white/80 p-8 shadow-md ">
          <img
            src={reworksLogo}
            alt="Reworks Solutions"
            className="h-auto max-w-2xl w-full"
          />
          <h2 className="text-center text-lg text-muted-foreground">
            Thank you for choosing Reworks Solutions! Please fill out the form
            below to help us find the right candidates for your business
          </h2>
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
              <CardTitle className="text-2xl">
                Business and contact details
              </CardTitle>
              <CardDescription>
                Tell us who you are and how we should follow up.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <section className="grid gap-5 sm:grid-cols-2">
                <form.Field name="businessName">
                  {(field) => (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="businessName" className="text-lg">
                        Business Name{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        name={field.name}
                        className="h-11 text-lg!"
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
                      <Label htmlFor="businessWebsite" className="text-lg">
                        Business Website
                      </Label>
                      <Input
                        id="businessWebsite"
                        name={field.name}
                        className="h-11 text-lg!"
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
                      <Label htmlFor="firstName" className="text-lg">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name={field.name}
                        className="h-11 text-lg!"
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
                      <Label htmlFor="lastName" className="text-lg">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name={field.name}
                        className="h-11 text-lg!"
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
                      <Label htmlFor="phone" className="text-lg">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name={field.name}
                        className="h-11 text-lg!"
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
                      <Label htmlFor="email" className="text-lg">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name={field.name}
                        className="h-11 text-lg!"
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
                      <Label htmlFor="secondaryEmail" className="text-lg">
                        Secondary Email
                      </Label>
                      <Input
                        id="secondaryEmail"
                        name={field.name}
                        className="h-11 text-lg!"
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
              <CardTitle className="text-2xl">Job details</CardTitle>
              <CardDescription>
                Provide the role details and anything else that would help us
                understand the hire.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 pt-6">
              <form.Field name="traits">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="traits" className="text-lg">
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
                    <Label htmlFor="outsourced" className="text-lg">
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
                    <Label htmlFor="additionalDetails" className="text-lg">
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
                  <CardTitle className="text-2xl">Roles</CardTitle>
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

                  return (
                    <div className="space-y-3">
                      {renderFieldError(field.state.meta.errors)}

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

                      <RoleDialog
                        open={editingRole !== null}
                        onOpenChange={(open) => {
                          if (!open) setEditingRole(null);
                        }}
                        initialRole={editingRole?.role}
                        isEditing={editingRole?.index !== -1}
                        onSave={(role) => handleSaveRole(role, field.pushValue)}
                      />
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
                  className="w-full max-w-xs py-6 text-lg bg-[#1d88c2]"
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
