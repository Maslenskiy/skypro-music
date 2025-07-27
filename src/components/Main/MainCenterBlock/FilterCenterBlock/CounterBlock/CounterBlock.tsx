type CounterBlockProps = {
  value: number | string;
};
export default function CounterBlock({ value }: CounterBlockProps) {
 const displayValue = String(value).length > 99 ? '99+' : value;



  return (
    <div
      style={{
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        backgroundColor: "#AD61FF",
        color: "#FFFFFF",
        textAlign: "center",
        position: "absolute",
        right: "0",
        transform: "translateY(-22px)",
      }}
    >
    {displayValue}
    </div>
  );
}
