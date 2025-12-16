// 이 파일은 더 이상 사용되지 않습니다. 각 report route가 분리되어 있습니다.
export default function DeprecatedReportTopic() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#141415] text-[#DBDCDF]">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">This route is deprecated</h1>
        <p className="text-[#AEB0B6]">
          Please use the separated report routes.<br />이전 $topic 통합 라우트는 더 이상 사용되지 않습니다.
        </p>
      </div>
    </div>
  );
}
