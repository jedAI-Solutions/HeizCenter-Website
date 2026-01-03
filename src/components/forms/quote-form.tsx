"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, QuoteFormData } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertCircle, Loader2, Calculator, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface QuoteFormProps {
  defaultService?: string;
}

export function QuoteForm(props: QuoteFormProps) {
  const { defaultService } = props;
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCalculatorData, setHasCalculatorData] = useState(false);
  const [isCalculatorExpanded, setIsCalculatorExpanded] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Extract URL parameters before form initialization
  const service = searchParams.get("service") || defaultService;
  const propertyType = searchParams.get("propertyType");
  const houseSize = searchParams.get("houseSize");
  const pumpType = searchParams.get("pumpType");
  const heatingType = searchParams.get("heatingType");
  const insulation = searchParams.get("insulation");
  const buildingYear = searchParams.get("buildingYear");
  const heatingSurface = searchParams.get("heatingSurface");
  const residents = searchParams.get("residents");
  const estimatedCost = searchParams.get("estimatedCost");
  const message = searchParams.get("message");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      serviceType: service as QuoteFormData["serviceType"] | undefined,
      propertyType: propertyType as QuoteFormData["propertyType"] | undefined,
      constructionYear: "",
      heatingArea: houseSize || "",
      pumpType: pumpType as QuoteFormData["pumpType"] | undefined,
      currentHeating: heatingType as QuoteFormData["currentHeating"] | undefined,
      insulation: insulation as QuoteFormData["insulation"] | undefined,
      buildingYear: buildingYear as QuoteFormData["buildingYear"] | undefined,
      heatingSurface: heatingSurface as QuoteFormData["heatingSurface"] | undefined,
      residents: residents || "",
      estimatedCost: estimatedCost || "",
      message: message || "",
      preferredContactTime: undefined,
      gdprConsent: false,
      honeypot: "",
    },
  });

  // Show validation errors to user and scroll to first error
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
      // Scroll to first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  }, [errors]);

  // Set calculator data flag
  useEffect(() => {
    if (houseSize || pumpType) {
      setHasCalculatorData(true);
    }
  }, [houseSize, pumpType]);

  // Watch serviceType for conditional calculator CTA
  const watchedServiceType = watch("serviceType");

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Ein Fehler ist aufgetreten",
        });
      }
    } catch (err) {
      console.error("Quote form submission error:", err);
      setSubmitStatus({
        type: "error",
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Calculator Data Notice */}
      {hasCalculatorData && (
        <div className="bg-[#0F5B78]/5 border border-[#0F5B78]/20 rounded-lg p-4 flex items-start gap-3">
          <Calculator className="h-5 w-5 text-[#0F5B78] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-[#0F5B78] mb-1">
              Daten aus Rechner übernommen
            </h4>
            <p className="text-sm text-[#0F5B78]">
              Ihre Angaben aus dem Wärmepumpen-Rechner wurden automatisch in dieses Formular übertragen.
              Sie können alle Felder nach Bedarf anpassen.
            </p>
          </div>
        </div>
      )}

      {/* Validation Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 rounded-lg flex items-start gap-3 bg-amber-50 text-amber-800 border border-amber-200">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Bitte füllen Sie alle Pflichtfelder aus:</p>
            <ul className="text-sm mt-1 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error?.message as string}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm">{submitStatus.message}</p>
        </div>
      )}

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Ihr vollständiger Name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="ihre.email@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Telefon *</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="+49 8234 966590078"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Location - PLZ/Ort required, Straße optional */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode">PLZ *</Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            placeholder="86399"
            maxLength={5}
            className={errors.postalCode ? "border-red-500" : ""}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="city">Ort *</Label>
          <Input
            id="city"
            {...register("city")}
            placeholder="Bobingen"
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Straße (optional)</Label>
        <Input
          id="address"
          {...register("address")}
          placeholder="Musterstraße 123"
          className={errors.address ? "border-red-500" : ""}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Service Details */}
      <div>
        <Label htmlFor="serviceType">Gewünschte Leistung *</Label>
        <Controller
          name="serviceType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={errors.serviceType ? "border-red-500" : ""}>
                <SelectValue placeholder="Bitte wählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waermepumpe">Wärmepumpe</SelectItem>
                <SelectItem value="heizung">Heizung</SelectItem>
                <SelectItem value="sanitaer">Sanitär & Bad</SelectItem>
                <SelectItem value="klimaanlage">Klimaanlage</SelectItem>
                <SelectItem value="solar">Solarthermie</SelectItem>
                <SelectItem value="sonstiges">Sonstiges</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.serviceType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.serviceType.message}
          </p>
        )}
      </div>

      {/* Calculator CTA - shows when Wärmepumpe is selected but no calculator data */}
      {watchedServiceType === "waermepumpe" && !hasCalculatorData && (
        <div className="bg-gradient-to-r from-[#0F5B78]/5 to-[#FFCA28]/10 border border-[#0F5B78]/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calculator className="h-5 w-5 text-[#0F5B78] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 mb-1">
                Wärmepumpen-Rechner nutzen?
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Mit unserem kostenlosen Rechner erhalten Sie eine erste Kostenschätzung
                und Ihre Daten werden automatisch übertragen.
              </p>
              <Link
                href="/rechner"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0F5B78] hover:text-[#0F5B78]/80 transition-colors"
              >
                Zum Wärmepumpen-Rechner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="propertyType">Objektart (optional)</Label>
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Bitte wählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="einfamilienhaus">Einfamilienhaus</SelectItem>
                <SelectItem value="mehrfamilienhaus">Mehrfamilienhaus</SelectItem>
                <SelectItem value="wohnung">Wohnung</SelectItem>
                <SelectItem value="gewerbe">Gewerbe</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="constructionYear">Baujahr (optional)</Label>
          <Input
            id="constructionYear"
            {...register("constructionYear")}
            placeholder="2010"
            maxLength={4}
            className={errors.constructionYear ? "border-red-500" : ""}
          />
          {errors.constructionYear && (
            <p className="text-red-500 text-sm mt-1">
              {errors.constructionYear.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="heatingArea">Heizfläche in m² (optional)</Label>
          <Input
            id="heatingArea"
            {...register("heatingArea")}
            placeholder="150"
            className={errors.heatingArea ? "border-red-500" : ""}
          />
          {errors.heatingArea && (
            <p className="text-red-500 text-sm mt-1">
              {errors.heatingArea.message}
            </p>
          )}
        </div>
      </div>

      {/* Calculator-Specific Fields - Collapsible (only for heat pump quotes) */}
      {hasCalculatorData && (
        <div className="border border-[#0F5B78]/20 rounded-lg overflow-hidden">
          {/* Collapsible Header */}
          <button
            type="button"
            onClick={() => setIsCalculatorExpanded(!isCalculatorExpanded)}
            className="w-full flex items-center justify-between p-4 bg-[#0F5B78]/5 hover:bg-[#0F5B78]/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5 text-[#0F5B78]" />
              <div className="text-left">
                <h4 className="font-semibold text-slate-900">
                  Daten aus Wärmepumpen-Rechner
                </h4>
                <p className="text-sm text-slate-600">
                  {houseSize && `${houseSize} m²`}
                  {pumpType && `, ${pumpType === "air-water" ? "Luft-Wasser" : pumpType === "ground-water" ? "Erdwärme" : "Wasser-Wasser"}`}
                  {estimatedCost && ` • ca. ${parseInt(estimatedCost).toLocaleString("de-DE")} €`}
                </p>
              </div>
            </div>
            {isCalculatorExpanded ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {/* Collapsible Content */}
          {isCalculatorExpanded && (
            <div className="p-4 pt-2 space-y-4 border-t border-[#0F5B78]/10">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pumpType">Wärmepumpen-Typ</Label>
                  <Controller
                    name="pumpType"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="pumpType">
                          <SelectValue placeholder="Bitte wählen..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="air-water">Luft-Wasser-Wärmepumpe</SelectItem>
                          <SelectItem value="ground-water">Sole-Wasser-Wärmepumpe (Erdwärme)</SelectItem>
                          <SelectItem value="water-water">Wasser-Wasser-Wärmepumpe</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="heatingSurface">Art der Heizflächen</Label>
                  <Controller
                    name="heatingSurface"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="heatingSurface">
                          <SelectValue placeholder="Bitte wählen..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="floor">Fußbodenheizung</SelectItem>
                          <SelectItem value="radiators">Heizkörper (Radiatoren)</SelectItem>
                          <SelectItem value="mixed">Gemischt</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentHeating">Aktuelle Heizung</Label>
                  <Controller
                    name="currentHeating"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="currentHeating">
                          <SelectValue placeholder="Bitte wählen..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gas">Gasheizung</SelectItem>
                          <SelectItem value="oil">Ölheizung</SelectItem>
                          <SelectItem value="electric">Elektroheizung</SelectItem>
                          <SelectItem value="coal">Kohleheizung</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="insulation">Dämmzustand</Label>
                  <Controller
                    name="insulation"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="insulation">
                          <SelectValue placeholder="Bitte wählen..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="poor">Schlecht (Altbau unsaniert)</SelectItem>
                          <SelectItem value="average">Durchschnittlich</SelectItem>
                          <SelectItem value="good">Gut (Neubau/saniert)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buildingYear">Gebäude-Baujahr</Label>
                  <Controller
                    name="buildingYear"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="buildingYear">
                          <SelectValue placeholder="Bitte wählen..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before-1980">Vor 1980</SelectItem>
                          <SelectItem value="1980-2000">1980-2000</SelectItem>
                          <SelectItem value="2000-2010">2000-2010</SelectItem>
                          <SelectItem value="2010-2015">2010-2015</SelectItem>
                          <SelectItem value="after-2015">Nach 2015</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="residents">Anzahl Personen im Haushalt</Label>
                  <Input
                    id="residents"
                    {...register("residents")}
                    placeholder="3"
                    className={errors.residents ? "border-red-500" : ""}
                  />
                </div>
              </div>

              {estimatedCost && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Geschätzte Kosten aus Rechner:</strong>{" "}
                    {parseInt(estimatedCost).toLocaleString("de-DE")} €
                  </p>
                  <input type="hidden" {...register("estimatedCost")} />
                </div>
              )}
            </div>
          )}

          {/* Hidden inputs to preserve calculator data when collapsed */}
          {!isCalculatorExpanded && (
            <>
              <input type="hidden" {...register("pumpType")} />
              <input type="hidden" {...register("heatingSurface")} />
              <input type="hidden" {...register("currentHeating")} />
              <input type="hidden" {...register("insulation")} />
              <input type="hidden" {...register("buildingYear")} />
              <input type="hidden" {...register("residents")} />
              <input type="hidden" {...register("estimatedCost")} />
            </>
          )}
        </div>
      )}

      {/* Additional Info */}
      <div>
        <Label htmlFor="message">Weitere Informationen (optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Beschreiben Sie Ihr Projekt..."
          rows={4}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="preferredContactTime">
          Bevorzugte Kontaktzeit (optional)
        </Label>
        <Controller
          name="preferredContactTime"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Bitte wählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morgens (8-12 Uhr)</SelectItem>
                <SelectItem value="afternoon">Nachmittags (12-17 Uhr)</SelectItem>
                <SelectItem value="evening">Abends (17-20 Uhr)</SelectItem>
                <SelectItem value="anytime">Jederzeit</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start gap-2">
        <Controller
          name="gdprConsent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="gdprConsent"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="gdprConsent" className="text-sm leading-relaxed">
          Ich akzeptiere die{" "}
          <a href="/datenschutz" className="text-[#0F5B78] hover:underline">
            Datenschutzerklärung
          </a>{" "}
          und stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage
          gespeichert werden. *
        </Label>
      </div>
      {errors.gdprConsent && (
        <p className="text-red-500 text-sm mt-1">
          {errors.gdprConsent.message}
        </p>
      )}

      {/* Honeypot */}
      <input
        type="text"
        {...register("honeypot")}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0F5B78] hover:bg-[#0F5B78] text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Wird gesendet...
          </>
        ) : (
          "Angebot anfordern"
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        * Pflichtfelder
      </p>
    </form>
  );
}
