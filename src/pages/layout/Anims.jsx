export const slide = {
    init: {
        opacity: 0,
        translateY: "-100%"
    },
    final: {
        opacity: 1,
        translateY: 0,
        transition: {
            delay: 0,
            ease: "easeInOut",
            duration: 0.25
        }
    },
    exit: {
        opacity: 0,
        translateY: "-100%",
        transition: {
            delay: 0,
            ease: "easeInOut",
            duration: 0.25
        }
    }
};

export const scale = {
    init: {
        opacity: 0,
        scale: 1.5
    },
    final: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0,
            ease: "easeInOut",
            duration: 0.25
        }
    },
    exit: {
        scale: 0.5,
        opacity: 0,
        transition: {
            delay: 0,
            ease: "easeInOut",
            duration: 0.25
        }
    }
};

export const animWithDelay = (delay) => {
    return {
        init: {
            opacity: 0,
            scale: 1.5
        },
        final: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: delay,
                ease: "easeInOut",
                duration: 0.25
            }
        },
        exit: {
            scale: 0,
            transition: {
                delay: 0,
                ease: "easeInOut",
                duration: 0.25
            }
        }
    }
};