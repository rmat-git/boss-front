import PermitSection from "../../components/shared/PermitSection";
import { PERMIT_DATA } from "../../data/constants";

export function HowItWorks() {
  return (
    <PermitSection
      id="how-it-works"
      data={PERMIT_DATA.new}
      bg="#ffffff"
      accentColor="#ff9c43"
      borderColor="#ffd9a8"
      siblingHref="#renewal"
      siblingLabel="Renewal"
    />
  );
}

export function RenewalSection() {
  return (
    <PermitSection
      id="renewal"
      data={PERMIT_DATA.renewal}
      bg="#f5f9ff"
      accentColor="#3b82f6"
      borderColor="#bfdbfe"
      siblingHref="#how-it-works"
      siblingLabel="New Permit"
    />
  );
}