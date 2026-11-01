type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description: string;
    centered?: boolean;
    dark?: boolean;
};

export default function SectionHeading({
    eyebrow,
    title,
    description,
    centered = true,
    dark = false,
}: SectionHeadingProps) {
    return (
        <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                {eyebrow}
            </p>

            <h2 className={`text-3xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-neutral-950'} sm:text-4xl lg:text-5xl`}>
                {title}
            </h2>

            <p className={`mt-5 text-base leading-7 ${dark ? 'text-neutral-400' : 'text-neutral-500'} sm:text-lg`}>
                {description}
            </p>
        </div>
    );
}