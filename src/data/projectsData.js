export const projectsData = [
    {
        id: 1,
        title: "Cyberpunk Shooter",
        categoryKey: "pc_console",
        description: "A fast-paced FPS with neon aesthetics and advanced AI mechanics.",
        detailedDescription: "An immersive first-person shooter featuring cutting-edge graphics, dynamic AI enemies, and a rich cyberpunk world. Built with Unity HDRP for stunning visual fidelity.",
        tech: ["Unity", "C#", "HDRP", "AI Navigation"],
        images: [
            "/projects/cyberpunk-1.jpg", // User will add these
            "/projects/cyberpunk-2.jpg",
            "/projects/cyberpunk-3.jpg"
        ],
        video: "", // User can add YouTube or direct video URL
        githubUrl: "",
        liveDemoUrl: "",
        featured: true
    },
    {
        id: 2,
        title: "Mystic RPG",
        categoryKey: "pc_console",
        description: "Open-world RPG featuring a custom quest system and inventory management.",
        detailedDescription: "An expansive role-playing game with a deep narrative, custom quest engine, and sophisticated inventory system. Features procedural world generation and dynamic weather.",
        tech: ["Unity", "C#", "Shader Graph", "Custom Editor Tools"],
        images: [
            "/projects/rpg-1.jpg",
            "/projects/rpg-2.jpg"
        ],
        video: "",
        githubUrl: "",
        liveDemoUrl: "",
        featured: true
    },
    {
        id: 3,
        title: "Hyper Run 3D",
        categoryKey: "mobile_3d",
        description: "Hypercasual endless runner optimized for mobile performance.",
        detailedDescription: "A highly optimized mobile game featuring smooth 60 FPS gameplay, procedural level generation, and engaging progression systems. Built with Unity's Universal Render Pipeline.",
        tech: ["Unity", "Mobile Optimization", "URP", "Object Pooling"],
        images: [
            "/projects/hyperrun-1.jpg"
        ],
        video: "",
        githubUrl: "",
        liveDemoUrl: "",
        featured: false
    },
    {
        id: 4,
        title: "Pixel Quest",
        categoryKey: "mobile_2d",
        description: "Classic 2D platformer with retro pixel art and touch controls.",
        detailedDescription: "A nostalgic platformer with hand-crafted levels, tight controls, and charming pixel art. Features multiple worlds, boss battles, and collectibles.",
        tech: ["Unity 2D", "Mobile", "Sprite Atlas", "Touch Controls"],
        images: [
            "/projects/pixel-1.jpg"
        ],
        video: "",
        githubUrl: "",
        liveDemoUrl: "",
        featured: false
    }
];

export const categories = [
    { key: "all", labelKey: "projects.categories.all" },
    { key: "pc_console", labelKey: "projects.categories.pc_console" },
    { key: "mobile_3d", labelKey: "projects.categories.mobile_3d" },
    { key: "mobile_2d", labelKey: "projects.categories.mobile_2d" }
];
