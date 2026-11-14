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
            <p className="mb-space-lg text-caption font-bold tracking-[0.25em] text-primary-600 uppercase">
                {eyebrow}
            </p>

            <h2
                className={`text-heading font-semibold tracking-tight ${dark ? 'text-white' : 'text-text-primary'} sm:text-display-sm lg:text-display-md`}
            >
                {title}
            </h2>

            <p
                className={`mt-space-xl text-body leading-7 ${dark ? 'text-gray-300' : 'text-text-secondary'} sm:text-subheading`}
            >
                {description}
            </p>
        </div>
    );
}
