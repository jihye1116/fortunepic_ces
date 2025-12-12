import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { DetailedListSection } from "@/components/report/DetailedListSection";
import { ImageDescriptionSection } from "@/components/report/ImageDescriptionSection";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/five-elements")({
  component: FiveElementsFortunePage,
});

function FiveElementsFortunePage() {
  const data = dummyReportData;

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="The Five Elements" />

        <div className="px-4 space-y-8">
          {data.tenGodsAndLifeStages && (
            <DetailedListSection
              items={[
                {
                  title: "Heavenly Stems 10 Gods",
                  description: data.tenGodsAndLifeStages.heavenlyStems,
                },
                {
                  title: "Earthly Branch 10 Gods",
                  description: data.tenGodsAndLifeStages.earthlyBranches,
                },
                {
                  title: "12 Life Stages",
                  description: data.tenGodsAndLifeStages.lifeStages,
                },
              ]}
            />
          )}

          <ImageDescriptionSection
            title="Growth Direction Gudiance"
            imageUrl="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=60"
            subTitle="Donations"
            description="donate to non-profit organizations that support the education"
            detailedDescription="Prepare your bowl by arranging the cooked rice, various colorful vegetables, and marinated meat on top. Fry an egg sunny-side up, ensuring the yolk remains runny and bright. Place the fried egg, a generous dollop of gochujang (chili paste), and sesame oil onto the rice. Mix all ingredients thoroughly, adjusting the sauce quantity to match your preferred taste. Enjoy your beautifully mixed Bibimbap immediately while it's warm!"
          />

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}
