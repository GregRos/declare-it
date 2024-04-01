export declare abstract class UnaryMessage<Type, Message> {
    private _type: Type
    private _message: Message
}
export declare abstract class BinaryMessage<Left, Message, Right> {
    private _left: Left
    private _message: Message
    private _right: Right
}
export declare abstract class 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦<
    Left,
    Message,
    Right
> extends BinaryMessage<Left, Message, Right> {}

export declare abstract class 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦<
    Left,
    Message,
    Right
> extends BinaryMessage<Left, Message, Right> {}

export declare abstract class 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<
    Left,
    Message,
    Right
> extends BinaryMessage<Left, Message, Right> {}
// FAILED_EQUALS:
export declare abstract class 𝗔𝗥𝗘_𝗡𝗢𝗧_𝗘𝗤𝗨𝗔𝗟<
    Left,
    Message,
    Right
> extends BinaryMessage<Left, Message, Right> {}

export declare class TheType_IsAny<T, Message> extends UnaryMessage<
    T,
    Message
> {}
