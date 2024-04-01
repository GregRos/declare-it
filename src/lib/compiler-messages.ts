export abstract class UnaryMessage<Type, Message> {
    constructor(
        private _type: Type,
        private _message: Message
    ) {}
}
export abstract class BinaryMessage<Left, Message, Right> {
    constructor(
        private _left: Left,
        private _right: Right,
        private _message: Message
    ) {}
}
export abstract class 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼<Left, Message, Right> extends BinaryMessage<
    Left,
    Message,
    Right
> {}

export abstract class 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺<Left, Message, Right> extends BinaryMessage<
    Left,
    Message,
    Right
> {}
export abstract class 𝗘𝗾𝘂𝗮𝗹𝘀<Left, Message, Right> extends BinaryMessage<
    Left,
    Message,
    Right
> {}

export class 𝗜𝘀𝑨𝒏𝒚<T, Message> extends UnaryMessage<T, Message> {}
